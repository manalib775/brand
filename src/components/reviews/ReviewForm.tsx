
import { useState } from "react";
import { Star, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ReviewFormProps {
  brandName: string;
  onSubmitReview?: (review: {
    rating: number;
    text: string;
    tags: string[];
  }) => void;
}

// Review tags categorized by type
const reviewTags = {
  product: [
    "Product Quality",
    "Value for Money",
    "Product Design",
    "Durability",
    "Features"
  ],
  service: [
    "Customer Service",
    "Response Time",
    "Resolution Speed",
    "Support Staff",
    "Warranty Service",
    "Return Process"
  ]
};

export function ReviewForm({ brandName, onSubmitReview }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const { toast } = useToast();

  const handleSubmitReview = () => {
    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a rating before submitting",
        variant: "destructive",
      });
      return;
    }

    if (selectedTags.length === 0) {
      toast({
        title: "Tags required",
        description: "Please select at least one tag for your review",
        variant: "destructive",
      });
      return;
    }

    if (review.trim() === "") {
      toast({
        title: "Review required",
        description: "Please write a review before submitting",
        variant: "destructive",
      });
      return;
    }

    // Call the onSubmitReview handler if provided
    if (onSubmitReview) {
      onSubmitReview({
        rating,
        text: review,
        tags: selectedTags,
      });
    }

    // Show success toast
    toast({
      title: "Review Submitted",
      description: "Thank you for your feedback! The brand will be notified.",
    });

    // Reset form and close dialog
    setRating(0);
    setReview("");
    setSelectedTags([]);
    setShowDialog(false);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(
      selectedTags.includes(tag)
        ? selectedTags.filter((t) => t !== tag)
        : [...selectedTags, tag]
    );
  };

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogTrigger asChild>
        <Button>
          <Star className="h-4 w-4 mr-2" />
          Write a Review
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Review {brandName}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>Rating</Label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="focus:outline-none"
                  type="button"
                >
                  <Star
                    className={`h-6 w-6 ${
                      rating >= star
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>What aspects are you reviewing?</Label>
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium mb-1">Product</h4>
                <div className="flex flex-wrap gap-2">
                  {reviewTags.product.map((tag) => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">Service</h4>
                <div className="flex flex-wrap gap-2">
                  {reviewTags.service.map((tag) => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Your Review</Label>
            <Textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Share your experience with this brand..."
              className="min-h-[120px]"
            />
          </div>
          
          <div className="flex justify-between items-center pt-2">
            <div className="text-xs text-muted-foreground">
              Your review will be visible to other users and the brand
            </div>
            <Button onClick={handleSubmitReview} className="flex items-center gap-2">
              Submit Review
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
