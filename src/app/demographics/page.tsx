"use client";

import { useMemo } from "react";
import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";
import StatCallout from "@/components/StatCallout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts";

// All historic active users (onboarded users who set demographics)
const genderRaw = [
  { name: "Male", value: 597287 },
  { name: "Female", value: 565285 },
  { name: "Non-Binary", value: 21450 },
];

const ageRaw = [
  { age: "12", users: 20435 },
  { age: "13", users: 30598 },
  { age: "14", users: 55669 },
  { age: "15", users: 86108 },
  { age: "16", users: 105495 },
  { age: "17", users: 102238 },
  { age: "18", users: 172609 },
  { age: "19", users: 119008 },
  { age: "20", users: 92319 },
  { age: "21", users: 70723 },
  { age: "22", users: 55078 },
  { age: "23", users: 46170 },
  { age: "24", users: 40010 },
  { age: "25", users: 75128 },
  { age: "26", users: 33866 },
  { age: "27", users: 14594 },
  { age: "28", users: 10853 },
  { age: "29", users: 8458 },
  { age: "30", users: 7127 },
];

const countryRaw = [
  { name: "United States", value: 378782 },
  { name: "United Kingdom", value: 111460 },
  { name: "Mexico", value: 79453 },
  { name: "Philippines", value: 34604 },
  { name: "Canada", value: 31100 },
  { name: "India", value: 30287 },
  { name: "Egypt", value: 23225 },
  { name: "Australia", value: 22889 },
  { name: "Morocco", value: 21777 },
  { name: "Romania", value: 20631 },
  { name: "UAE", value: 18298 },
  { name: "Saudi Arabia", value: 18196 },
  { name: "Germany", value: 17636 },
  { name: "Brazil", value: 17457 },
  { name: "Italy", value: 16415 },
  { name: "South Africa", value: 15626 },
  { name: "Argentina", value: 15275 },
  { name: "Colombia", value: 13705 },
  { name: "France", value: 13367 },
  { name: "Spain", value: 13316 },
];

const GENDER_COLORS = ["#0066FF", "#8627FF", "#FF4D00"];
const COUNTRY_COLORS = [
  "#0066FF", "#8627FF", "#FF4D00", "rgba(0, 204, 120, 1)", "#FF4D00",
  "#00CC78", "#0066FF", "#FF4D00", "#8627FF", "rgba(0, 204, 120, 1)",
  "#FF4D00", "#00CC78", "#0066FF", "#8627FF", "#FF4D00",
  "rgba(0, 204, 120, 1)", "#FF4D00", "#00CC78", "#0066FF", "#8627FF",
];

const genderChartConfig: ChartConfig = {
  Male: { label: "Male", color: GENDER_COLORS[0] },
  Female: { label: "Female", color: GENDER_COLORS[1] },
  "Non-Binary": { label: "Non-Binary", color: GENDER_COLORS[2] },
};

const ageChartConfig: ChartConfig = {
  "%": { label: "Share", color: "#8627FF" },
};

const countryChartConfig: ChartConfig = {};
countryRaw.forEach((c, i) => {
  countryChartConfig[c.name] = { label: c.name, color: COUNTRY_COLORS[i % COUNTRY_COLORS.length] };
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderPieLabel = (props: any) => {
  const { name, percent } = props;
  if (percent < 0.03) return null;
  return `${name} ${(percent * 100).toFixed(1)}%`;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderCountryLabel = (props: any) => {
  const { percent } = props;
  if (percent < 0.04) return null;
  return `${(percent * 100).toFixed(1)}%`;
};

export default function DemographicsPage() {
  const totalGender = useMemo(() => genderRaw.reduce((s, d) => s + d.value, 0), []);
  const malePct = useMemo(() => Math.round((597287 / (597287 + 565285)) * 100), []);
  const femalePct = useMemo(() => Math.round((565285 / (597287 + 565285)) * 100), []);

  const totalAge = useMemo(() => ageRaw.reduce((s, d) => s + d.users, 0), []);
  const ageChartData = useMemo(() =>
    ageRaw.map(d => ({ age: d.age, "%": parseFloat(((d.users / totalAge) * 100).toFixed(1)) })),
    [totalAge]
  );

  const genZ = useMemo(() => {
    return ageRaw.filter(d => {
      const age = parseInt(d.age);
      return age >= 14 && age <= 29;
    }).reduce((s, d) => s + d.users, 0);
  }, []);
  const genZPct = useMemo(() => Math.round((genZ / totalAge) * 100), [genZ, totalAge]);

  const totalCountry = useMemo(() => countryRaw.reduce((s, d) => s + d.value, 0), []);

  return (
    <Section>
      <div className="mb-12">
        <PageHeader
          label="Demographics"
          title="A balanced, global community"
          subtitle="Our demographics reflect a genuinely diverse user base - balanced gender ratio, Gen Z core, and users across 100+ countries."
        />
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <StatCallout value={`${malePct}/${femalePct}`} label="Male/Female Ratio" />
        <StatCallout value={`${genZPct}%`} label="Gen Z (14-29)" color="text-accent-purple" />
        <StatCallout value="20+" label="Countries" color="text-accent-blue" />
        <StatCallout value="100%" label="Identity Verified" color="text-accent-orange" />
      </div>

      {/* Gender Distribution - Pie Chart */}
      <Card className="bg-card mb-6">
        <CardHeader>
          <CardTitle>Gender Distribution</CardTitle>
          <CardDescription>All onboarded users - source: Amplitude</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderRaw}
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  innerRadius={60}
                  dataKey="value"
                  label={renderPieLabel}
                  labelLine={false}
                  strokeWidth={0}
                >
                  {genderRaw.map((_, i) => (
                    <Cell key={i} fill={GENDER_COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px" }}
                  itemStyle={{ color: "var(--foreground)" }}
                  formatter={(value: unknown) => {
                    const v = Number(value);
                    const pct = ((v / totalGender) * 100).toFixed(1);
                    return [`${v.toLocaleString()} (${pct}%)`, "Users"];
                  }}
                />
                <Legend wrapperStyle={{ color: "var(--muted-foreground)", fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-secondary rounded-2xl px-5 py-4 mt-4">
            <p className="text-muted-foreground text-sm leading-relaxed">
                Equals has an unusually balanced gender split for a social app - {malePct}% male to {femalePct}% female.
                Most social platforms skew heavily male (Reddit, Discord) or female (Pinterest). Music appeals
                universally across gender, and Equals reflects that.
              </p>
          </div>
        </CardContent>
      </Card>

      {/* Age Distribution - Bar Chart */}
      <Card className="bg-card mb-6">
        <CardHeader>
          <CardTitle>Age Distribution</CardTitle>
          <CardDescription>All onboarded users - source: Amplitude</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={ageChartConfig} className="h-[320px] w-full">
            <BarChart data={ageChartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="age" tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 11 }} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value) => `${value}%`}
                  />
                }
              />
              <Bar dataKey="%" fill="#8627FF" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
          <div className="bg-secondary rounded-2xl px-5 py-4 mt-4">
            <p className="text-muted-foreground text-sm leading-relaxed">
                {genZPct}% of users are Gen Z (14-29), with the single largest cohort being 18-year-olds.
                The peak at 18 aligns with the age when music fandom is most intense and identity-forming. This is the demographic
                every music label, streaming service, and brand wants to reach.
              </p>
          </div>
        </CardContent>
      </Card>

      {/* Country Distribution - Pie Chart */}
      <Card className="bg-card mb-6">
        <CardHeader>
          <CardTitle>Top Countries</CardTitle>
          <CardDescription>All historic active users, user-stated location - source: Amplitude</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={countryRaw}
                  cx="50%"
                  cy="50%"
                  outerRadius={140}
                  innerRadius={70}
                  dataKey="value"
                  label={renderCountryLabel}
                  labelLine={true}
                  strokeWidth={0}
                >
                  {countryRaw.map((_, i) => (
                    <Cell key={i} fill={COUNTRY_COLORS[i % COUNTRY_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px" }}
                  itemStyle={{ color: "var(--foreground)" }}
                  formatter={(value: unknown) => {
                    const v = Number(value);
                    const pct = ((v / totalCountry) * 100).toFixed(1);
                    return [`${v.toLocaleString()} (${pct}%)`, "Users"];
                  }}
                />
                <Legend
                  wrapperStyle={{ color: "var(--muted-foreground)", fontSize: "10px" }}
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-secondary rounded-2xl px-5 py-4 mt-4">
            <p className="text-muted-foreground text-sm leading-relaxed">
                Equals has a genuinely global user base spanning 6 continents. The US and UK lead, but Mexico, Philippines, India,
                Egypt, and Morocco all feature prominently - reflecting the universal appeal of music as a social connector.
                This diversity is achieved with content moderation across 40+ languages and identity verification working internationally.
              </p>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card className="bg-card border-accent-blue/30">
        <CardHeader>
          <CardTitle>Why This Matters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-muted-foreground text-sm leading-relaxed">
          <p>
            Most consumer social apps struggle with demographic imbalance. Dating apps skew male. Gaming platforms skew young male.
            Lifestyle apps skew female. Equals is one of the rare social platforms with near-parity gender distribution ({malePct}/{femalePct})
            and a core Gen Z audience ({genZPct}% aged 14-29).
          </p>
          <p>
            The global distribution across 20+ countries with meaningful user counts means Equals
            has inherent geographic diversification. This reduces market concentration risk and opens multiple monetisation
            paths. Every user is identity-verified, so the demographic data is real, not estimated or inferred.
          </p>
        </CardContent>
      </Card>
    </Section>
  );
}
