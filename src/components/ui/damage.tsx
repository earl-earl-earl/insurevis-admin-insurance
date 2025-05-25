'use client';

import { Card, CardContent, CardHeader } from './card';

interface DamageAssessmentProps {
  damages: Array<{
    type: string;
    location: string;
    severity: string;
    confidence: string;
  }>;
  totalCost: string;
  modelConfidence: string;
}

export function DamageAssessmentCard({ damages, totalCost, modelConfidence }: DamageAssessmentProps) {
  return (
    <Card>
      <CardHeader>
        <h3>CNN Damage Assessment Results</h3>
        <p>Model Confidence: {modelConfidence}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {damages.map((damage, index) => (
            <div key={index} className="flex justify-between items-center p-3 border rounded">
              <div>
                <span className="font-semibold">{damage.type}</span> - {damage.location}
                <br />
                <span className={`text-sm ${
                  damage.severity === 'Severe' ? 'text-red-600' :
                  damage.severity === 'Moderate' ? 'text-yellow-600' : 'text-green-600'
                }`}>
                  {damage.severity}
                </span>
              </div>
              <span className="text-sm text-gray-500">{damage.confidence}</span>
            </div>
          ))}
          <div className="pt-3 border-t">
            <strong>Total Estimated Cost: {totalCost}</strong>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}