import { Button } from "@/components/ui/button";
import { Home, Search, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-black flex items-center justify-center">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20"></div>
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-purple-500 rounded-full opacity-20 animate-float blur-xl"></div>
        <div
          className="absolute top-40 right-20 w-16 h-16 bg-blue-500 rounded-full opacity-25 animate-float blur-lg"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-40 left-20 w-12 h-12 bg-purple-600 rounded-full opacity-15 animate-float blur-lg"
          style={{ animationDelay: "4s" }}
        ></div>
        <div
          className="absolute bottom-20 right-10 w-24 h-24 bg-blue-500 rounded-full opacity-20 animate-float blur-xl"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative z-10 w-full max-w-lg mx-auto p-6 text-center">
        <div className="bg-black/80 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-8 shadow-2xl">
          <div className="w-20 h-20 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Search className="h-10 w-10 text-purple-400" />
          </div>

          <h1 className="text-6xl font-bold text-white mb-4">404</h1>

          <h2 className="text-2xl font-bold text-white mb-4">Page Not Found</h2>

          <p className="text-gray-300 mb-8">
            The page you're looking for doesn't exist or has been moved. Let's
            get you back on track with your studies!
          </p>

          <div className="space-y-3">
            <Link href="/dashboard">
              <Button className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2">
                <Home className="w-5 h-5" />
                <span>Go to Dashboard</span>
              </Button>
            </Link>

            <Link href="/">
              <Button
                variant="outline"
                className="w-full py-3 border-white/20 text-white hover:bg-white/10 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Home</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
