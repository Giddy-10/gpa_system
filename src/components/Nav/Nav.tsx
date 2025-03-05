import React from "react"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "../ui/navigation-menu"
import Link from "next/link"

const navLinks = [
    { name: "Home", url: "/" },
    { name: "Get Started", url: "/get-started" },
    { name: "Sign Up", url: "/signup" },
    { name: "Log In", url: "/login" },
]

const Nav = () => {
    return (
        <NavigationMenu className="block justify-center mx-auto w-[80%] max-w-full py-2">
            <NavigationMenuList className="w-full flex flex-row justify-evenly py-2">
                {navLinks.map((link) => {
                    return (
                        <NavigationMenuItem key={link.name}>
                            <Link href={link.url} legacyBehavior passHref>
                                <NavigationMenuLink>
                                    {link.name}
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    )
                })}
            </NavigationMenuList>
        </NavigationMenu>
    )
}

export default Nav
