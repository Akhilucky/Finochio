"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, TrendingUp, Gamepad2 } from "lucide-react";

export default function LandingPage() {
  const router = useRouter();

  const handleGetStarted = () => {
    // Navigate to the login page
    router.push("/login");
  };

  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 py-20 bg-blue-50">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Track your finances. <br /> Level up your life.
          </h1>
          <p className="text-lg text-gray-600">
            Finochio makes personal finance fun. Compete with friends, climb leaderboards,
            and master money habits with challenges.
          </p>
          <Button
            className="bg-red-600 text-white px-6 py-3 rounded-2xl"
            onClick={handleGetStarted}
          >
            Get Started Free
          </Button>
        </div>
        <img
          src="https://i.pinimg.com/736x/12/76/3c/12763cf1b10a8301a2daa1ab1c85d502.jpg"
          alt="Finance dashboard"
          className="md:w-1/3 rounded-xl shadow-lg mb-10 md:mb-0"
         />
      </section>

      {/* Features Section */}
      <section className="px-6 md:px-20 py-16 bg-white grid md:grid-cols-3 gap-8 text-center">
        <Card className="p-6">
          <CardContent>
            <Gamepad2 className="w-10 h-10 mx-auto text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Gamified Challenges</h3>
            <p className="text-gray-600">Make saving and spending smarter with interactive finance games.</p>
          </CardContent>
        </Card>
        <Card className="p-6">
          <CardContent>
            <Trophy className="w-10 h-10 mx-auto text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Leaderboards</h3>
            <p className="text-gray-600">Compete with friends and the community to earn rewards and badges.</p>
          </CardContent>
        </Card>
        <Card className="p-6">
          <CardContent>
            <TrendingUp className="w-10 h-10 mx-auto text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Trend Tracking</h3>
            <p className="text-gray-600">Visualize your financial habits and take control of your future.</p>
          </CardContent>
        </Card>
      </section>

      {/* How It Works */}
      <section className="bg-blue-50 py-20 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-10 text-center">
          <div>
            <h4 className="text-xl font-semibold mb-2">1. Sign Up</h4>
            <p className="text-gray-600">Create your profile and securely link your accounts.</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-2">2. Join Challenges</h4>
            <p className="text-gray-600">Pick goals and challenges tailored to your habits.</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-2">3. Track & Win</h4>
            <p className="text-gray-600">Climb the board, earn badges, and celebrate wins.</p>
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="bg-gray-900 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to make finance fun?</h2>
        <p className="text-lg text-gray-300 mb-6">Join Finochio and start winning at personal finance today.</p>
        <Button
          className="bg-red-600 text-white px-6 py-3 rounded-2xl"
          onClick={handleGetStarted}
        >
          Login / Signup
        </Button>
      </section>
    </div>
  );
}