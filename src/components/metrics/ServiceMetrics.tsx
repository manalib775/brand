
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Clock,
  Star,
  Shield,
  TrendingUp,
  ThumbsUp,
  Gauge,
  AlertTriangle,
  CheckCircle,
  Frown,
  Meh,
  Smile,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface ServiceMetricsProps {
  brandName: string;
  metrics: {
    resolutionRate: number;
    serviceSatisfaction: number;
    warrantyClaimsData: {
      month: string;
      approved: number;
      rejected: number;
    }[];
    supportChannels: {
      call: number;
      email: number;
      chat: number;
      store: number;
    };
    escalationRating: number;
    serviceCenter: {
      available: boolean;
      avgTurnaround: number;
    };
    warrantyClaimSpeed: number;
    returnSteps: number;
    refundTime: number;
    deliveryScore: number;
    sentiment: "positive" | "neutral" | "negative";
    recallStatus: "safe" | "moderate" | "high";
  };
}

export function ServiceMetrics({ brandName, metrics }: ServiceMetricsProps) {
  const getResolutionColor = (rate: number) => {
    if (rate >= 90) return "text-green-600";
    if (rate >= 70) return "text-green-400";
    if (rate >= 50) return "text-orange-400";
    return "text-red-500";
  };

  const renderSentimentEmoji = (sentiment: "positive" | "neutral" | "negative") => {
    switch (sentiment) {
      case "positive":
        return <Smile className="h-8 w-8 text-green-500" />;
      case "neutral":
        return <Meh className="h-8 w-8 text-yellow-500" />;
      case "negative":
        return <Frown className="h-8 w-8 text-red-500" />;
    }
  };

  const renderRecallBadge = (status: "safe" | "moderate" | "high") => {
    const badges = {
      safe: (
        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
          <CheckCircle className="h-4 w-4 mr-1" /> Safe
        </Badge>
      ),
      moderate: (
        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
          <AlertTriangle className="h-4 w-4 mr-1" /> Moderate Recall Risk
        </Badge>
      ),
      high: (
        <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
          <AlertTriangle className="h-4 w-4 mr-1" /> High Recall Risk
        </Badge>
      ),
    };
    return badges[status];
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Resolution Rate Meter */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gauge className="h-5 w-5" />
            Resolution Rate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`text-4xl font-bold ${getResolutionColor(metrics.resolutionRate)}`}>
            {metrics.resolutionRate}%
          </div>
          <Progress value={metrics.resolutionRate} className="mt-4" />
        </CardContent>
      </Card>

      {/* Service Satisfaction */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ThumbsUp className="h-5 w-5" />
            Service Satisfaction
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-blue-600">
            {metrics.serviceSatisfaction}%
          </div>
          <Progress value={metrics.serviceSatisfaction} className="mt-4" />
        </CardContent>
      </Card>

      {/* Warranty Claims */}
      <Card className="md:col-span-2 lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Warranty Claims
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={metrics.warrantyClaimsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="approved" stackId="claims" fill="#22c55e" />
              <Bar dataKey="rejected" stackId="claims" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Escalation Rating */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Escalation Rating
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-6 w-6 ${
                  i < metrics.escalationRating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Service Center Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Service Center
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Available:</span>
              <Badge variant={metrics.serviceCenter.available ? "default" : "destructive"}>
                {metrics.serviceCenter.available ? "Yes" : "No"}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span>Avg. Turnaround:</span>
              <span className="font-semibold">
                {metrics.serviceCenter.avgTurnaround} days
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delivery Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            On-Time Delivery
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-blue-600">
            {metrics.deliveryScore}%
          </div>
          <Progress value={metrics.deliveryScore} className="mt-4" />
        </CardContent>
      </Card>

      {/* Brand Sentiment */}
      <Card>
        <CardHeader>
          <CardTitle>Brand Trust</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-2">
            {renderSentimentEmoji(metrics.sentiment)}
            {renderRecallBadge(metrics.recallStatus)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
