"use client";
import { Input } from "@/components/atoms/Input";

export function SearchBar({ value, onChange, placeholder = "Rechercher un article, un actif, une idée..." }: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <Input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      autoComplete="off"
    />
  );
}
