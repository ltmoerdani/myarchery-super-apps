import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Calendar, Users, Award } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to ArcheryConnect
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your premier platform for archery tournaments, training, and community
          </p>
          <div className="space-x-4">
            <Link
              to="/register"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Get Started
            </Link>
            <Link
              to="/events"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors"
            >
              Browse Events
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Training Resources</h3>
              <p className="text-gray-600">
                Access expert tutorials and training materials
              </p>
            </div>
            <div className="text-center p-6">
              <Calendar className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Event Management</h3>
              <p className="text-gray-600">
                Organize and participate in tournaments
              </p>
            </div>
            <div className="text-center p-6">
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-gray-600">
                Connect with fellow archers worldwide
              </p>
            </div>
            <div className="text-center p-6">
              <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Competition</h3>
              <p className="text-gray-600">
                Join tournaments and track your progress
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;