
import React from "react";
import { Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

interface ShareButtonsProps {
  title: string;
  url: string;
}

const ShareButtons = ({ title, url }: ShareButtonsProps) => {
  const shareUrl = encodeURIComponent(url);
  const shareTitle = encodeURIComponent(title);
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    toast({
      title: "Link copied to clipboard",
      description: "You can now share this article with your friends.",
    });
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">Share:</span>
      
      {/* Twitter/X */}
      <a 
        href={`https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 bg-muted hover:bg-muted/80 text-white rounded-full transition-colors"
        aria-label="Share on Twitter"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
        </svg>
      </a>
      
      {/* Facebook */}
      <a 
        href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 bg-muted hover:bg-muted/80 text-white rounded-full transition-colors"
        aria-label="Share on Facebook"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
      </a>
      
      {/* Copy Link */}
      <Button 
        variant="secondary" 
        size="sm" 
        onClick={handleCopyLink}
        className="flex items-center gap-1 p-2"
      >
        <Share className="h-4 w-4" />
        <span>Copy</span>
      </Button>
    </div>
  );
};

export default ShareButtons;
