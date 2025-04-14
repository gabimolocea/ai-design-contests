// app/create-contest/page.tsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Navbar } from "@/components/ui/navbar";

export default function CreateContest() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Start a Design Contest</h1>
      
      {/* Step 1: Choose Category */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">1. Choose a Category</h2>
        <RadioGroup defaultValue="logo" className="grid grid-cols-3 gap-4">
          {["Logo", "Website", "App Design"].map((cat) => (
            <div key={cat}>
              <RadioGroupItem value={cat.toLowerCase()} id={cat} />
              <Label htmlFor={cat}>{cat}</Label>
            </div>
          ))}
        </RadioGroup>
      </section>

      {/* Step 2: Contest Details */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">2. Describe Your Needs</h2>
        <div className="space-y-4">
          <Input placeholder="Contest Title" />
          <Textarea placeholder="Detailed description..." rows={5} />
          <Input type="file" />
        </div>
      </section>

      {/* Step 3: Pricing Tier */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">3. Select a Package</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { name: "Basic", price: "$199", features: ["10+ designs", "3-day duration"] },
            { name: "Standard", price: "$399", features: ["30+ designs", "7-day duration"] },
            { name: "Premium", price: "$699", features: ["50+ designs", "Priority support"] },
          ].map((pkg) => (
            <div key={pkg.name} className="border rounded-lg p-4">
              <h3 className="font-bold">{pkg.name}</h3>
              <p className="text-2xl my-2">{pkg.price}</p>
              <ul className="list-disc pl-5">
                {pkg.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <Button className="mt-4 w-full">Select</Button>
            </div>
          ))}
        </div>
      </section>

      <Button size="lg">Launch Contest</Button>
    </div>
  )
}