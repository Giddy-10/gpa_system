import React from "react"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "../ui/navigation-menu"
import Link from "next/link"
import { Separator } from "../ui/separator"

const navLinks = [
    { name: "Home", url: "/" },
    { name: "Dashboard", url: "/dashboard" },
    { name: "Get Started", url: "/get-started" },
    [
        { name: "Sign Up", url: "/signup" },
        { name: "Log In", url: "/login" },
    ],
]

const Nav = () => {
    return (
        <NavigationMenu className="block justify-center mx-auto w-[80%] max-w-full py-2">
            <NavigationMenuList className="w-full flex flex-row justify-evenly py-2 [&_*]:duration-200">
                {navLinks.map((data, index) => {
                    if (Array.isArray(data)) {
                        return (
                            <NavigationMenuItem key={`group-pos-${index}`} className="flex flex-row gap-0 h-fit bg-primary text-primary-foreground rounded-md">
                                {data.map((link, index) => {
                                    return (
                                        <React.Fragment key={link.name}>
                                            {index ? <Separator className="inline" orientation="vertical" /> : ""}
                                            <Link
                                                href={link.url}
                                                legacyBehavior
                                                passHref
                                            >
                                                <NavigationMenuLink className="block px-4 py-2 font-bold hover:text-md hover:tracking-widest hover:bg-background hover:text-foreground">
                                                    {link.name}
                                                </NavigationMenuLink>
                                            </Link>
                                        </React.Fragment>
                                    )
                                })}
                            </NavigationMenuItem>
                        )
                    } else {
                        return (
                            <NavigationMenuItem key={data.name}>
                                <Link href={data.url} legacyBehavior passHref>
                                    <NavigationMenuLink className="px-4 py-2 rounded-sm font-bold hover:text-md hover:tracking-widest hover:bg-primary hover:text-primary-foreground">
                                        {data.name}
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        )
                    }
                })}
            </NavigationMenuList>
        </NavigationMenu>
    )
}

export default Nav
