"use client"

import * as React from "react"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export type Option = {
    label: string
    value: string
}

interface MultiSelectProps {
    options: Option[]
    selected: string[]
    onChange: (selected: string[]) => void
    placeholder?: string
    className?: string
    emptyMessage?: string
}

export function MultiSelect({
    options,
    selected,
    onChange,
    placeholder = "Select items...",
    className,
    emptyMessage = "No items found.",
}: MultiSelectProps) {
    const [open, setOpen] = React.useState(false)

    const handleUnselect = (item: string) => {
        onChange(selected.filter((i) => i !== item))
    }

    const handleSelect = (value: string) => {
        if (selected.includes(value)) {
            onChange(selected.filter((item) => item !== value))
        } else {
            onChange([...selected, value])
        }
    }

    return (
        <>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <div
                        role="combobox"
                        aria-expanded={open}
                        className={cn(
                            "flex min-h-10 w-full flex-wrap items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
                            className
                        )}
                    >
                        <div className="flex flex-wrap gap-1">
                            {Array.isArray(selected) && selected.length > 0 ? (
                                selected.map((item) => {
                                    const selectedOption = options.find(
                                        (option) => option.value === item
                                    )
                                    return (
                                        <Badge
                                            key={item}
                                            variant="secondary"
                                            className="flex items-center gap-1 px-2"
                                        >
                                            {selectedOption?.label}
                                            <button
                                                type="button"
                                                className="rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleUnselect(item)
                                                }}
                                            >
                                                <X className="h-3 w-3" />
                                                <span className="sr-only">
                                                    Remove{" "}
                                                    {selectedOption?.label}
                                                </span>
                                            </button>
                                        </Badge>
                                    )
                                })
                            ) : (
                                <span className="text-muted-foreground">
                                    {placeholder}
                                </span>
                            )}
                        </div>
                        <div className="flex shrink-0 opacity-50">▼</div>
                    </div>
                </PopoverTrigger>
                <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                    <Command>
                        <CommandInput placeholder="Search items..." />
                        <CommandEmpty>{emptyMessage}</CommandEmpty>
                        <CommandGroup className="max-h-64 overflow-auto">
                            {Array.isArray(options) &&
                                options.length > 0 &&
                                options.map((option) => {
                                    const isSelected = selected.includes(
                                        option.value
                                    )
                                    return (
                                        <CommandItem
                                            key={option.value}
                                            value={option.value}
                                            onSelect={() =>
                                                handleSelect(option.value)
                                            }
                                        >
                                            <div
                                                className={cn(
                                                    "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                                    isSelected
                                                        ? "bg-primary text-primary-foreground"
                                                        : "opacity-50"
                                                )}
                                            >
                                                {isSelected && (
                                                    <span className="h-2 w-2 rounded-sm bg-current" />
                                                )}
                                            </div>
                                            {option.label}
                                        </CommandItem>
                                    )
                                })}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
        </>
    )
}
