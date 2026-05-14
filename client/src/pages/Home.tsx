import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, Leaf, AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface PredictionResult {
  prediction: string;
  confidence: number;
  probabilities: Record<string, number>;
  color: string;
}

const CLASS_COLORS: Record<string, string> = {
  'Healthy': '#10b981',
  'Powdery': '#f59e0b',
  'Rust': '#ef4444'
};

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setImage(base64);
      predictDisease(base64);
    };
    reader.readAsDataURL(file);
  };

  const predictDisease = async (imageData: string) => {
    setLoading(true);
    try {
      const base64String = imageData.split(',')[1];
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockResults = [
        { prediction: 'Healthy', confidence: 0.92, probabilities: { 'Healthy': 0.92, 'Powdery': 0.05, 'Rust': 0.03 } },
        { prediction: 'Powdery', confidence: 0.87, probabilities: { 'Healthy': 0.08, 'Powdery': 0.87, 'Rust': 0.05 } },
        { prediction: 'Rust', confidence: 0.89, probabilities: { 'Healthy': 0.06, 'Powdery': 0.05, 'Rust': 0.89 } }
      ];
      
      const mockResult = mockResults[Math.floor(Math.random() * mockResults.length)];
      setResult({
        ...mockResult,
        color: CLASS_COLORS[mockResult.prediction]
      });
      
      toast.success(`Detected: ${mockResult.prediction}`);
    } catch (error) {
      toast.error('Failed to analyze image');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getDiseaseDescription = (disease: string): string => {
    const descriptions: Record<string, string> = {
      'Healthy': 'Your plant is healthy! Continue with regular care and monitoring.',
      'Powdery': 'Powdery mildew detected. Apply fungicide and improve air circulation.',
      'Rust': 'Rust disease detected. Remove affected leaves and apply treatment.'
    };
    return descriptions[disease] || 'Disease detected. Consult agricultural experts.';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center gap-3">
          <Leaf className="w-8 h-8 text-green-600" />
          <h1 className="text-3xl font-bold text-gray-900">Plant Disease Detector</h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-8 border-2 border-dashed border-green-200 hover:border-green-400 transition-colors">
            <div className="flex flex-col items-center justify-center gap-4">
              <Upload className="w-16 h-16 text-green-500" />
              <h2 className="text-2xl font-semibold text-gray-900">Upload Leaf Image</h2>
              <p className="text-gray-600 text-center">Take a clear photo of your plant leaf and upload it for analysis</p>
              
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded-lg"
                disabled={loading}
              >
                {loading ? 'Analyzing...' : 'Choose Image'}
              </Button>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              
              {image && (
                <div className="mt-4 w-full">
                  <img
                    src={image}
                    alt="Uploaded leaf"
                    className="w-full h-64 object-cover rounded-lg border border-green-200"
                  />
                </div>
              )}
            </div>
          </Card>

          <div className="flex flex-col gap-6">
            {result ? (
              <>
                <Card className="p-6 border-l-4" style={{ borderLeftColor: result.color }}>
                  <div className="flex items-start gap-4">
                    {result.prediction === 'Healthy' ? (
                      <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                    ) : (
                      <AlertCircle className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1" />
                    )}
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{result.prediction}</h3>
                      <p className="text-gray-600 mt-2">{getDiseaseDescription(result.prediction)}</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Confidence Score</h4>
                  <div className="space-y-3">
                    {Object.entries(result.probabilities).map(([disease, prob]) => (
                      <div key={disease}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">{disease}</span>
                          <span className="text-sm font-semibold text-gray-900">{(prob * 100).toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full transition-all"
                            style={{
                              width: `${prob * 100}%`,
                              backgroundColor: CLASS_COLORS[disease]
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Recommendations</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {result.prediction === 'Healthy' && (
                      <>
                        <li>✓ Continue regular watering schedule</li>
                        <li>✓ Maintain proper sunlight exposure</li>
                        <li>✓ Monitor for any changes</li>
                      </>
                    )}
                    {result.prediction === 'Powdery' && (
                      <>
                        <li>• Apply sulfur-based fungicide</li>
                        <li>• Improve air circulation</li>
                        <li>• Remove affected leaves</li>
                      </>
                    )}
                    {result.prediction === 'Rust' && (
                      <>
                        <li>• Remove heavily infected leaves</li>
                        <li>• Apply copper fungicide</li>
                        <li>• Reduce leaf wetness</li>
                      </>
                    )}
                  </ul>
                </Card>
              </>
            ) : (
              <Card className="p-8 text-center">
                <Leaf className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Upload an image to see results</p>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
