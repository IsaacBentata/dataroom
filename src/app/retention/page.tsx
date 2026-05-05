"use client";

import { useMemo } from "react";
import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";
import StatCallout from "@/components/StatCallout";
import DataChart from "@/components/DataChart";
import DownloadAllButton from "@/components/DownloadAllButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  parseWeeklyRetentionByFriends,
  parseWeeklyRetention,
  parsePowerCurve,
  parseEngagementExcludingCurrent,
  parseTimeSpentPerUser,
  parseSessionsPerUser,
  parseAppOpensPerUser,
  parseWauMau,
  parseFriendsMatchMadeMonthly,
  parseChatMessagesSentMonthly,
} from "@/lib/data";

export default function RetentionPage() {
  const weeklyRetentionByFriends = useMemo(() => parseWeeklyRetentionByFriends(), []);
  const weeklyRetention = useMemo(() => parseWeeklyRetention(), []);
  const powerCurve = useMemo(() => parsePowerCurve(), []);
  const engagement = useMemo(() => parseEngagementExcludingCurrent(), []);
  const timeSpentPerUser = useMemo(() => parseTimeSpentPerUser(), []);
  const sessionsPerUser = useMemo(() => parseSessionsPerUser(), []);
  const appOpensPerUser = useMemo(() => parseAppOpensPerUser(), []);
  const wauMau = useMemo(() => parseWauMau(), []);
  const friendsMatchMade = useMemo(() => parseFriendsMatchMadeMonthly(), []);
  const chatMessages = useMemo(() => parseChatMessagesSentMonthly(), []);

  return (
    <Section>
      <div className="flex items-start justify-between gap-4 mb-12">
        <PageHeader
          label="Retention & Engagement"
          title="Friends drive retention. Retention drives everything."
          subtitle="The single most important insight in our data: users who add friends retain dramatically better. This is not correlation - it is the social graph creating compounding value."
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
            { name: "Friendships Made Monthly", data: friendsMatchMade },
            { name: "Chat Messages Sent Monthly", data: chatMessages },
          ]}
          filename="equals-retention-data"
        />
      </div>

      {/* ── Weekly Retention by Friends (hero chart) ── */}
      <Card className="bg-card mb-10">
        <CardHeader>
          <div className="flex gap-6">
            <div style={{ flex: "0 0 30%" }}>
              <CardTitle className="font-mono">The network effect chart</CardTitle>
            </div>
            <div className="flex-1">
              <p className="text-sm text-black">
                Weekly retention segmented by number of friends
                shows a clear, consistent pattern: the more friends a user adds, the higher their retention
                at every time horizon. Users with 50+ friends retain at 40% at Week 8 - over 2x the baseline. This proves the network effect is working.
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

      {/* ── Time Spent (second chart) ── */}
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
      />

      {/* ── Stat callouts ── */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-10">
        <StatCallout value="33%" label="D7 Retention (Onboarded Users)" color="text-accent-blue" />
        <StatCallout value="35 min" label="Daily Time Spent (Onboarded Users)" color="text-accent-orange" />
        <StatCallout value="30%+" label="Return 5+ Days/Week (Onboarded Users)" color="text-accent-green" />
      </div>

      {/* ── Long-term stickiness (weekly retention evolution) ── */}
      <Card className="bg-card mb-6">
        <CardHeader>
          <CardTitle>Long-term stickiness</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            Weekly retention has improved consistently as the product has matured. Users are not just trying Equals - they are building habits around it.
            The upward trend across Week 1, Week 2, and Week 4 retention shows that the product is getting stickier over time, not just growing.
            This is the foundation for durable, compounding growth: each cohort retains better than the last.
          </p>
          <DataChart
            className="border-0 p-0 shadow-none ring-0"
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
          subtitle="30-day rolling avg of Application Opened events per onboarded daily active user"
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
        subtitle="% of users active on exactly N days per week. The uptick at 7 days is a retention smile - a cohort of power users who return every single day, a hallmark of sticky consumer products."
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
        subtitle="Averaging 46% in the last month, up from 33% last quarter - crossed into the 'Great' tier of consumer-social stickiness"
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
        subtitle="Avg engaged actions per user per month. An engaged action is any active interaction with impact across the network: sending a message, liking a post, making a friend, commenting, reposting, voting on a poll, speaking in a chatroom, or entering a quiz competition."
        type="bar"
        height={280}
        showDateFilter={false}
      />

      {/* ── Friendships Made Monthly ── */}
      <DataChart
        data={friendsMatchMade}
        series={[
          { key: "Friendships Made", name: "Friendships Made", color: "#0066FF" },
        ]}
        xKey="month"
        title="Friendships Made per Month"
        subtitle="Total new friendships formed on the platform each month. The social graph is growing exponentially - from 186K friendships in Oct 2025 to 4.3M in Apr 2026."
        type="bar"
        height={320}
        yAxisFormatter={(v: number) => v >= 1000000 ? `${(v / 1000000).toFixed(1)}M` : `${(v / 1000).toFixed(0)}K`}
        tooltipFormatter={(v: number) => v.toLocaleString()}
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
