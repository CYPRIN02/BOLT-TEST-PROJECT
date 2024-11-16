import { Sparkles } from 'lucide-react';
import ImageUploader from './components/ImageUploader';
import Navbar from './components/Navbar';
import ResultCard from './components/ResultCard';
import { useState } from 'react';

interface AnalysisResult {
  productType: string;
  confidence: number;
  ingredients: string[];
  recommendations: string[];
}

export default function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);

  const handleImageUpload = async (imageFile: File) => {
    setSelectedImage(URL.createObjectURL(imageFile));
    setIsAnalyzing(true);

    // Simulate AI analysis with setTimeout
    setTimeout(() => {
      setResults({
        productType: "Luxury Anti-Aging Cream",
        confidence: 98.5,
        ingredients: [
          "Retinol",
          "Hyaluronic Acid",
          "Peptides",
          "Vitamin C"
        ],
        recommendations: [
          "Best for mature skin types",
          "Apply in the evening after cleansing",
          "Follow with sunscreen during day use",
          "Store in a cool, dark place"
        ]
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
            SublimePick
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Upload your cosmetic product image for instant AI analysis
          </p>
          <div className="flex items-center justify-center gap-2 text-purple-600">
            <Sparkles className="w-5 h-5" />
            <span className="font-medium">Powered by Advanced AI Technology</span>
          </div>
        </section>

        {/* Upload Section */}
        <section className="max-w-2xl mx-auto mb-12">
          <ImageUploader 
            onImageUpload={handleImageUpload}
            isAnalyzing={isAnalyzing}
          />
        </section>

        {/* Results Section */}
        {(selectedImage || isAnalyzing) && (
          <section className="max-w-4xl mx-auto">
            <ResultCard
              image={selectedImage}
              isAnalyzing={isAnalyzing}
              results={results}
            />
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-md mt-auto">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600">
          <p>© {new Date().getFullYear()} SublimePick. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}