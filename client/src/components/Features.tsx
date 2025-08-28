import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FileText, Edit3, Layers } from "lucide-react";

export default function Features() {
    const features = [
        {
            icon: <FileText className="w-6 h-6" />,
            title: "Organize Your Notes",
            description:
                "Create, edit, and manage your notes easily in one place. Simple and clean interface designed for productivity.",
        },
        {
            icon: <Edit3 className="w-6 h-6" />,
            title: "Rich Text Editing",
            description:
                "Format your notes with headings, bold, italics, and more. Everything you need for structured content.",
        },
        {
            icon: <Layers className="w-6 h-6" />,
            title: "Stay Organized",
            description:
                "Create notebooks and keep notes neatly grouped under names you choose—simple, clear, and hassle-free.",
        },
    ];

    return (
        <section className="py-16 md:py-24 bg-background">
            <div className="max-w-5xl mx-auto px-6 text-center">
                <h2 className="text-4xl font-semibold md:text-5xl">
                    📝 Simple, Fast, and Built for You
                </h2>
                <p className="mt-4 text-muted-foreground">
                    Everything you need to capture ideas and keep your notes
                    organized — without distractions.
                </p>

                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <Card
                            key={index}
                            className="text-center hover:scale-105 transition-all cursor-pointer"
                        >
                            <CardHeader>
                                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg font-medium">
                                    {feature.title}
                                </h3>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    {feature.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
