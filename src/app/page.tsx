import { Navbar } from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Main content container with centered alignment */}
      <main className="flex flex-col items-center">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Get Custom Designs from Creative Professionals
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Launch a contest and receive dozens of designs to choose from
              </p>
              <Button size="lg" className="mt-8">
                Start a Contest
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-12 bg-muted/50">
          <div className="container mx-auto max-w-7xl px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                { 
                  title: "Start Your Contest", 
                  description: "Describe your design needs in minutes" 
                },
                { 
                  title: "Receive Designs", 
                  description: "Get dozens of concepts from our community" 
                },
                { 
                  title: "Pick Your Favorite", 
                  description: "Collaborate with designers to perfect your design" 
                },
              ].map((step, index) => (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground">
                        {index + 1}
                      </div>
                      <CardTitle>{step.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}