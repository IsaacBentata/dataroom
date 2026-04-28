"use client";

import { useMemo } from "react";
import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";
import StatCallout from "@/components/StatCallout";
import DataChart from "@/components/DataChart";
import DownloadAllButton from "@/components/DownloadAllButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  parseRetentionByFriends,
  parseRetentionOverTime,
  parseWeeklyRetention,
  parsePowerCurve,
  parseEngagementExcludingCurrent,
  parseMessagesPerUser,
  parseTimeSpentPerUser,
  parseSessionsPerUser,
  parseAppOpensPerUser,
} from "@/lib/data";

export default function RetentionPage() {
  const retentionByFriends = useMemo(() => parseRetentionByFriends(), []);
  const retentionOverTime = useMemo(() => parseRetentionOverTime(), []);
  const weeklyRetention = useMemo(() => parseWeeklyRetention(), []);
  const powerCurve = useMemo(() => parsePowerCurve(), []);
  const engagement = useMemo(() => parseEngagementExcludingCurrent(), []);
  const messagesPerUser = useMemo(() => parseMessagesPerUser(), []);
  const timeSpentPerUser = useMemo(() => parseTimeSpentPerUser(), []);
  const sessionsPerUser = useMemo(() => parseSessionsPerUser(), []);
  const appOpensPerUser = useMemo(() => parseAppOpensPerUser(), []);

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
            { name: "Retention Over Time", data: retentionOverTime },
            { name: "Retention by Friends Added", data: retentionByFriends },
            { name: "Weekly Retention Evolution", data: weeklyRetention },
            { name: "Power Curve Stickiness", data: powerCurve },
            { name: "Engagement per User", data: engagement },
            { name: "Messages per User", data: messagesPerUser },
            { name: "Time Spent per User", data: timeSpentPerUser },
            { name: "Sessions per User", data: sessionsPerUser },
            { name: "App Opens per User", data: appOpensPerUser },
          ]}
          filename="equals-retention-data"
        />
      </div>

      <DataChart
        data={retentionOverTime}
        series={[
          { key: "D1", name: "Day 1", color: "rgba(0, 204, 120, 1)" },
          { key: "D7", name: "Day 7", color: "#0066FF" },
          { key: "D14", name: "Day 14", color: "#8627FF" },
          { key: "D30", name: "Day 30", color: "#FF4D00" },
        ]}
        xKey="period"
        title="Retention Over Time"
        subtitle="N-Day retention for verified users, improving month over month"
        type="line"
        height={320}
        yAxisFormatter={(v: number) => `${v}%`}
        tooltipFormatter={(v: number) => `${v}%`}
      />

      <Card className="bg-card my-10">
        <CardHeader>
          <CardTitle className="font-mono">The network effect chart</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm mb-5">
            This is the most important chart in the data room. Retention by number of friends added
            shows a clear, consistent pattern: the more friends a user adds, the higher their retention
            at every time horizon. Users with 50+ friends retain at 36% on D30 - nearly 3x the baseline. This proves the network effect is working.
          </p>
          <DataChart
            data={retentionByFriends}
            series={[
              { key: "All Users", name: "All Users", color: "rgba(255,255,255,0.25)" },
              { key: "1+ Friends", name: "1+ Friends", color: "rgba(0, 204, 120, 1)" },
              { key: "10+ Friends", name: "10+ Friends", color: "#0066FF" },
              { key: "50+ Friends", name: "50+ Friends", color: "#8627FF" },
            ]}
            xKey="day"
            title="Retention by Friends Added (D0 through D30)"
            subtitle="N-Day retention segmented by friend count - all days through D30"
            type="line"
            height={380}
            yAxisFormatter={(v: number) => `${v}%`}
            tooltipFormatter={(v: number) => `${v}%`}
            className="border-0 p-0 shadow-none ring-0"
            showDateFilter={false}
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-10">
        <StatCallout value="34%" label="D7 Retention" color="text-accent-blue" />
        <StatCallout value="~20%" label="D30 Retention" color="text-accent-purple" />
        <StatCallout value="37 min" label="Daily Time Spent" color="text-accent-orange" />
        <StatCallout value="30%+" label="Return 5+ Days/Week" color="text-accent-green" />
      </div>

      <DataChart
        data={messagesPerUser}
        series={[
          { key: "Messages / User", name: "Avg Messages per User per Day", color: "#0000FF" },
        ]}
        xKey="date"
        title="Messages per Verified Active User"
        subtitle="30-day rolling average of daily messages sent per verified active user"
        type="line"
        height={280}
        showDateFilter={false}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <DataChart
          data={timeSpentPerUser}
          series={[
            { key: "Minutes / User", name: "Minutes per User per Day", color: "rgba(0, 204, 120, 1)" },
          ]}
          xKey="date"
          title="Time Spent per User"
          subtitle="30-day rolling avg of daily session time per verified user (minutes)"
          type="area"
          height={280}
          showDateFilter={false}
        />

        <DataChart
          data={sessionsPerUser}
          series={[
            { key: "Sessions / User", name: "Sessions per User per Day", color: "#8627FF" },
          ]}
          xKey="date"
          title="Sessions per User"
          subtitle="30-day rolling avg of daily sessions per verified user"
          type="area"
          height={280}
          showDateFilter={false}
        />
      </div>

      <DataChart
        data={appOpensPerUser}
        series={[
          { key: "App Opens / User", name: "App Opens per User per Day", color: "#FF4D00" },
        ]}
        xKey="date"
        title="App Opens per User"
        subtitle="30-day rolling avg of Application Opened events per verified daily active user"
        type="line"
        height={280}
        showDateFilter={false}
      />

      <DataChart
        data={weeklyRetention}
        series={[
          { key: "Week 1", name: "Week 1 Retention", color: "rgba(0, 204, 120, 1)" },
          { key: "Week 2", name: "Week 2 Retention", color: "#0066FF" },
          { key: "Week 4", name: "Week 4 Retention", color: "#8627FF" },
        ]}
        xKey="week"
        title="Weekly Retention Evolution"
        subtitle="How weekly retention has improved over time for verified users"
        type="line"
        height={320}
        yAxisFormatter={(v: number) => `${v}%`}
        tooltipFormatter={(v: number) => `${v}%`}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <DataChart
          data={powerCurve}
          series={[
            { key: "All Users", name: "All Users", color: "rgba(255,255,255,0.25)" },
            { key: "1+ Friends", name: "1+ Friends", color: "rgba(0, 204, 120, 1)" },
            { key: "10+ Friends", name: "10+ Friends", color: "#0066FF" },
            { key: "50+ Friends", name: "50+ Friends", color: "#8627FF" },
          ]}
          xKey="days"
          title="Power Curve / Stickiness"
          subtitle="% of users active on exactly N days per week"
          type="bar"
          height={280}
          showDateFilter={false}
          yAxisFormatter={(v: number) => `${v}%`}
          tooltipFormatter={(v: number) => `${v}%`}
        />

        <DataChart
          data={engagement}
          series={[
            { key: "Avg Actions", name: "Avg Actions per User", color: "#E84393" },
          ]}
          xKey="month"
          title="Engagement per User"
          subtitle="Average engagement actions per user per month (excluding current month)"
          type="bar"
          height={280}
          showDateFilter={false}
        />
      </div>
    </Section>
  );
}
