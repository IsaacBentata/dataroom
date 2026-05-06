import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJwt } from "@/lib/jwt";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow auth API, Next.js internals, static assets, and the globe animation
  if (
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/equals-globe") ||
    pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|woff|woff2|otf|ttf|css|js)$/)
  ) {
    return NextResponse.next();
  }

  const sessionCookie = request.cookies.get("dr-session");

  if (!sessionCookie?.value) {
    return new Response(getLoginPageHtml(), {
      status: 401,
      headers: { "Content-Type": "text/html" },
    });
  }

  const payload = verifyJwt(sessionCookie.value);
  if (!payload || !payload.investor) {
    return new Response(getLoginPageHtml(), {
      status: 401,
      headers: { "Content-Type": "text/html" },
    });
  }

  return NextResponse.next();
}

function getLoginPageHtml(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Equals - Series A Data Room</title>
  <style>
    body {
      margin: 0;
      background: #fafafa;
      font-family: monospace;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
    }
    .gate {
      text-align: left;
    }
    input {
      font-family: monospace;
      font-size: 12px;
      line-height: 160%;
      letter-spacing: 0.24px;
      text-transform: uppercase;
      color: #000;
      background: transparent;
      border: 0;
      outline: none;
      padding: 0;
      margin: 0;
      width: 220px;
    }
    .error {
      font-family: monospace;
      font-size: 12px;
      line-height: 160%;
      letter-spacing: 0.24px;
      text-transform: uppercase;
      color: rgba(0, 0, 0, 0.3);
      margin-top: 4px;
      display: none;
    }
  </style>
</head>
<body>
  <div class="gate">
    <form id="auth-form">
      <input id="pw" type="text" placeholder="Enter Password" autocomplete="off" spellcheck="false" autofocus />
      <div class="error" id="error-msg">Incorrect</div>
    </form>
  </div>
  <script>
    (function() {
      var real = '';
      var input = document.getElementById('pw');
      var form = document.getElementById('auth-form');
      var errorEl = document.getElementById('error-msg');

      input.addEventListener('input', function(e) {
        var next = e.target.value;
        if (next.length > real.length) {
          real += next.slice(real.length);
        } else {
          real = real.slice(0, next.length);
        }
        input.value = '='.repeat(real.length);
        errorEl.style.display = 'none';
      });

      var locked = false;

      form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (locked) return;
        fetch('/api/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password: real })
        })
        .then(function(res) { return res.json().then(function(d) { d._status = res.status; return d; }); })
        .then(function(data) {
          if (data.success) {
            localStorage.setItem('equals-data-room-investor', data.investor);
            window.location.reload();
          } else if (data._status === 429) {
            locked = true;
            var secs = data.retryAfter || 60;
            errorEl.textContent = 'Too many attempts. Try again in ' + secs + 's';
            errorEl.style.display = 'block';
            input.disabled = true;
            var iv = setInterval(function() {
              secs--;
              if (secs <= 0) {
                clearInterval(iv);
                locked = false;
                input.disabled = false;
                errorEl.style.display = 'none';
                errorEl.textContent = 'Incorrect';
                input.focus();
              } else {
                errorEl.textContent = 'Too many attempts. Try again in ' + secs + 's';
              }
            }, 1000);
          } else {
            errorEl.textContent = 'Incorrect';
            errorEl.style.display = 'block';
          }
        })
        .catch(function() {
          errorEl.textContent = 'Incorrect';
          errorEl.style.display = 'block';
        });
      });
    })();
  </script>
</body>
</html>`;
}

export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|equals-globe|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.svg$|.*\\.gif$|.*\\.ico$|.*\\.woff$|.*\\.woff2$|.*\\.otf$|.*\\.ttf$).*)",
  ],
};
