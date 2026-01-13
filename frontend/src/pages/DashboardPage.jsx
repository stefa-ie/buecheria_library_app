import { BookOpen } from "lucide-react"

// Basic Card component
function Card({ children, className = "" }) {
  return <div className={`shadow-sm ${className}`}>{children}</div>
}

export default function DashboardPage() {
  return (
    <div>
          <div className="grid grid-cols-4 gap-6">
            {/* Gesamte Bücher Card */}
            <Card className="p-6 bg-white rounded-2xl border border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total number</p>
                  <p className="text-sm text-gray-600 mb-3">of Books</p>
                  <p className="text-4xl font-bold text-gray-900">2,847</p>
                </div>
                <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </Card>
          </div>
    </div>
  )
}
