"use client";

import { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";
import StatCallout from "@/components/StatCallout";
import DataChart from "@/components/DataChart";
import DownloadAllButton from "@/components/DownloadAllButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  parseFriendCountDistribution,
  parseWeeklyRetentionByFriends,
  parseWeeklyRetention,
  parsePowerCurve,
  parseEngagementExcludingCurrent,
  parseTimeSpentPerUser,
  parseSessionsPerUser,
  parseAppOpensPerUser,
  parseWauMau,
  parseChatMessagesSentMonthly,
} from "@/lib/data";

export default function RetentionPage() {
  const friendDistribution = useMemo(() => parseFriendCountDistribution(), []);
  const friendTotal = useMemo(() => friendDistribution.reduce((s, d) => s + d.value, 0), [friendDistribution]);
  const weeklyRetentionByFriends = useMemo(() => parseWeeklyRetentionByFriends(), []);
  const weeklyRetention = useMemo(() => parseWeeklyRetention(), []);
  const powerCurve = useMemo(() => parsePowerCurve(), []);
  const engagement = useMemo(() => parseEngagementExcludingCurrent(), []);
  const timeSpentPerUser = useMemo(() => parseTimeSpentPerUser(), []);
  const sessionsPerUser = useMemo(() => parseSessionsPerUser(), []);
  const appOpensPerUser = useMemo(() => parseAppOpensPerUser(), []);
  const wauMau = useMemo(() => parseWauMau(), []);
  const chatMessages = useMemo(() => parseChatMessagesSentMonthly(), []);

  return (
    <Section>
      <div className="flex items-start justify-between gap-4 mb-12">
        <PageHeader
          label="Retention & Engagement"
          title="Friends drive retention. Retention drives everything."
          subtitle="Users who add friends retain dramatically better. The social graph creates compounding value."
        />
        <DownloadAllButton
          datasets={[
            { name: "Weekly Retention by Friends", data: weeklyRetentionByFriends },
            { name: "Weekly Retention Evolution", data: weeklyRetention },
            { name: "Power Curve Stickiness", data: powerCurve },
            { name: "Engagement per User", data: engagement },
            { name: "Time Spent per User", data: timeSpentPerUser },
            { name: "Sessions per User", data: sessionsPerUser },
            { name: "App Opens per User", data: appOpensPerUser },
            { name: "WAU/MAU Stickiness", data: wauMau },
            { name: "Chat Messages Sent Monthly", data: chatMessages },
          ]}
          filename="equals-retention-data"
        />
      </div>

      {/* ── Long-term stickiness (weekly retention evolution) - FIRST ── */}
      <Card className="bg-card mb-6">
        <CardHeader>
          <CardTitle>Long-term stickiness</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            Weekly retention improved consistently as the product matured.
            Week 1, Week 2, and Week 4 all trend up. Each cohort retains better than the last.
          </p>
          <DataChart
            className="border-0 px-0 pt-4 pb-2 shadow-none ring-0"
            data={weeklyRetention}
            series={[
              { key: "Week 1", name: "Week 1 Retention", color: "rgba(0, 204, 120, 1)" },
              { key: "Week 2", name: "Week 2 Retention", color: "#0066FF" },
              { key: "Week 4", name: "Week 4 Retention", color: "#8627FF" },
            ]}
            xKey="week"
            title="Weekly Retention Evolution"
            subtitle="How weekly retention has improved over time for onboarded users"
            type="line"
            height={320}
            yAxisFormatter={(v: number) => `${v}%`}
            tooltipFormatter={(v: number) => `${v}%`}
          />
        </CardContent>
      </Card>

      {/* ── Weekly Retention by Friends ── */}
      <Card className="bg-card mb-10">
        <CardHeader>
          <div className="flex gap-6">
            <div style={{ flex: "0 0 30%" }}>
              <CardTitle className="font-mono">The network effect chart</CardTitle>
            </div>
            <div className="flex-1">
              <p className="text-sm text-black">
                Weekly retention segmented by friend count.
                More friends = higher retention at every time horizon. 50+ friends retain at 40% at Week 8, over 2x baseline.
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <DataChart
            className="mt-4 border-0 px-0 pt-4 pb-2 shadow-none ring-0"
            data={weeklyRetentionByFriends}
            series={[
              { key: "All Users", name: "All Users", color: "rgba(0,0,0,0.35)" },
              { key: "1+ Friends", name: "1+ Friends", color: "rgba(0, 204, 120, 1)" },
              { key: "10+ Friends", name: "10+ Friends", color: "#0066FF" },
              { key: "50+ Friends", name: "50+ Friends", color: "#8627FF" },
            ]}
            xKey="week"
            title="Weekly Retention by Friends Added"
            subtitle="Weekly retention for onboarded users, segmented by friend count"
            type="line"
            height={380}
            yAxisFormatter={(v: number) => `${v}%`}
            tooltipFormatter={(v: number) => `${v}%`}
            showDateFilter={false}
          />
        </CardContent>
      </Card>

      {/* ── Friend Count Distribution ── */}
      <Card className="bg-card mb-10">
        <CardHeader>
          <CardTitle>How many friends do users have?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            72% of onboarded users have at least one friend. 43% have 10+. 18% have 50+ (the cohort retaining at 40% at Week 8). As k-factor mechanics ship, these distributions shift upward.
          </p>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={friendDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  innerRadius={60}
                  dataKey="value"
                  label={({ name, percent }) => (percent ?? 0) < 0.05 ? null : `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                  labelLine={false}
                  strokeWidth={0}
                >
                  {friendDistribution.map((d) => (
                    <Cell key={d.name} fill={d.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px" }}
                  itemStyle={{ color: "var(--foreground)" }}
                  formatter={(value: unknown, name: unknown) => {
                    const v = Number(value);
                    const pct = ((v / friendTotal) * 100).toFixed(1);
                    return [`${pct}%`, String(name)];
                  }}
                />
                <Legend wrapperStyle={{ color: "var(--muted-foreground)", fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* ── Stat callouts ── */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-10">
        <StatCallout value="48.8%" label="W1 Retention" color="text-accent-blue" />
        <StatCallout value="35 min" label="Daily Time Spent" color="text-accent-orange" />
        <StatCallout value="30%+" label="Return 5+ Days/Week" color="text-accent-green" />
      </div>

      {/* ── Time Spent ── */}
      <DataChart
        data={timeSpentPerUser}
        series={[
          { key: "Minutes / User", name: "Minutes per User per Day", color: "rgba(0, 204, 120, 1)" },
        ]}
        xKey="date"
        title="Time Spent per User"
        subtitle="30-day rolling avg of daily session time per onboarded user (minutes)"
        type="area"
        height={320}
        showDateFilter={false}
        referenceLines={[
          { y: 30, label: "Snapchat 30 min" },
          { y: 32, label: "Instagram 32 min" },
        ]}
        headerChildren={
          <div style={{ color: "#FF4D00", fontSize: 11, fontWeight: 500, textAlign: "right", marginRight: 12 }}>
            TikTok 90 min
          </div>
        }
      />

      {/* ── Sessions + App Opens ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <DataChart
          data={sessionsPerUser}
          series={[
            { key: "Sessions / User", name: "Sessions per User per Day", color: "#8627FF" },
          ]}
          xKey="date"
          title="Sessions per User"
          subtitle="30-day rolling avg of daily sessions per onboarded user"
          type="area"
          height={280}
          showDateFilter={false}
        />

        <DataChart
          data={appOpensPerUser}
          series={[
            { key: "App Opens / User", name: "App Opens per User per Day", color: "#FF4D00" },
          ]}
          xKey="date"
          title="App Opens per User"
          subtitle="30-day rolling avg of Application Opened events per onboarded active user"
          type="line"
          height={280}
          showDateFilter={false}
        />
      </div>

      {/* ── Power Curve ── */}
      <DataChart
        data={powerCurve}
        series={[
          { key: "All Users", name: "All Users", color: "rgba(0,0,0,0.35)" },
          { key: "1+ Friends", name: "1+ Friends", color: "rgba(0, 204, 120, 1)" },
          { key: "10+ Friends", name: "10+ Friends", color: "#0066FF" },
          { key: "50+ Friends", name: "50+ Friends", color: "#8627FF" },
        ]}
        xKey="days"
        title="Power Curve / Stickiness"
        subtitle="% of users active on exactly N days per week. Uptick at 7 days is a retention smile: a cohort of power users returning daily."
        type="bar"
        height={280}
        showDateFilter={false}
        yAxisFormatter={(v: number) => `${v}%`}
        tooltipFormatter={(v: number) => `${v}%`}
      />

      {/* ── WAU/MAU ── */}
      <DataChart
        data={wauMau}
        series={[
          { key: "WAU/MAU", name: "WAU / MAU", color: "rgba(0, 204, 120, 1)" },
        ]}
        xKey="month"
        title="WAU / MAU Stickiness"
        subtitle="46% in the last month, up from 33% last quarter. Now in the 'Great' tier of consumer-social stickiness."
        type="line"
        height={320}
        yAxisFormatter={(v: number) => `${v}%`}
        tooltipFormatter={(v: number) => `${v}%`}
        showDateFilter={false}
      />

      {/* ── Engagement per User ── */}
      <DataChart
        data={engagement}
        series={[
          { key: "Avg Actions", name: "Avg Actions per User", color: "#E84393" },
        ]}
        xKey="month"
        title="Engagement per User"
        subtitle="Avg engaged actions per user per month. An engaged action is any interaction with network impact: message, like, friend add, comment, repost, poll vote, chatroom speech, or quiz entry."
        type="bar"
        height={280}
        showDateFilter={false}
      />

      {/* ── Chat Messages Sent Monthly ── */}
      <DataChart
        data={chatMessages}
        series={[
          { key: "Messages Sent", name: "Messages Sent", color: "#8627FF" },
        ]}
        xKey="month"
        title="Chat Messages Sent per Month"
        subtitle="Total messages sent across all chat surfaces. From 2.2M in Oct 2025 to 28.4M in Apr 2026 - a 13x increase in 6 months."
        type="bar"
        height={320}
        yAxisFormatter={(v: number) => v >= 1000000 ? `${(v / 1000000).toFixed(0)}M` : `${(v / 1000).toFixed(0)}K`}
        tooltipFormatter={(v: number) => v.toLocaleString()}
      />
    </Section>
  );
}
