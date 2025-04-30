
import React from "react";
import { 
  ArrowLeft, Bell, MessageCircle, MoreVertical, Grid,
  Play, User, Home, Search, Plus, Video, Award,
  TrendingUp, Heart, BookmarkCheck, Calendar, Clock, CircleDollarSign, 
  BarChart, Star, CircleCheck, Lock
} from "lucide-react";

export {
  ArrowLeft, Bell, MessageCircle, MoreVertical, Grid,
  Play, User, Home, Search, Plus, Video, Award,
  TrendingUp, Heart, BookmarkCheck, Calendar, Clock, CircleDollarSign, 
  BarChart, Star, CircleCheck, Lock
};

export const Badge = ({ variant, className, children }: any) => {
  return <span className={`px-2 py-0.5 text-xs rounded-full ${className}`}>{children}</span>;
};

export const Button = ({ variant, size, className, children, ...props }: any) => {
  const sizeClass = size === "sm" ? "px-3 py-1.5 text-sm" : "px-4 py-2";
  const variantClass = 
    variant === "outline" ? "bg-transparent border border-gray-200 hover:bg-gray-100" : 
    variant === "ghost" ? "bg-transparent hover:bg-gray-100" : 
    "bg-primary text-white hover:bg-primary/90";
  
  return (
    <button 
      className={`rounded-md font-medium transition-colors ${sizeClass} ${variantClass} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

export const Tabs = ({ value, onValueChange, className, children }: any) => {
  return <div className={className}>{children}</div>;
};

export const TabsList = ({ className, children }: any) => {
  return <div className={className}>{children}</div>;
};

export const TabsTrigger = ({ value, className, children }: any) => {
  return <button className={className}>{children}</button>;
};

export const TabsContent = ({ value, className, children }: any) => {
  return <div className={className}>{children}</div>;
};
