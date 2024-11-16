import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface ResultCardProps {
  image: string | null;
  isAnalyzing: boolean;
  results: {
    productType: string;
    confidence: number;
    ingredients: string[];
    recommendations: string[];
  } | null;
}

export default function ResultCard({ image, isAnalyzing, results }: ResultCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Image Preview */}
        <div className="p-6">
          {image && (
            <img
              src={image}
              alt="Uploaded product"
              className="w-full h-64 object-contain rounded-lg"
            />
          )}
        </div>

        {/* Analysis Results */}
        <div className="p-6 bg-gray-50">
          <h3 className="text-2xl font-semibold mb-4">Analysis Results</h3>
          
          {isAnalyzing ? (
            <div className="space-y-4">
              <Skeleton count={4} />
            </div>
          ) : results ? (
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="text-green-500 w-5 h-5" />
                  <h4 className="font-medium">Product Type</h4>
                </div>
                <p className="text-gray-700">{results.productType}</p>
                <p className="text-sm text-gray-500">
                  Confidence: {results.confidence.toFixed(1)}%
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Key Ingredients</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {results.ingredients.map((ingredient) => (
                    <li key={ingredient}>{ingredient}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">Recommendations</h4>
                <ul className="space-y-2">
                  {results.recommendations.map((rec) => (
                    <li key={rec} className="flex items-start gap-2">
                      <AlertCircle className="text-purple-500 w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}