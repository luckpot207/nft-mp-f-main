import { Image, Grid, GridItem, VStack, Flex, Box, Button, Text, HStack, Spacer } from "@chakra-ui/react";
import { useColor } from "../../hooks/useColor";
import { useFontSize } from "../../hooks/useFontSize";
import { useState, useEffect } from "react";

interface GradientBorderProps {
    p: string
    width: string
    height: string
    bg: string
    children: React.ReactNode 
}

export default function GradientBorder({p, width, height, bg, children}: GradientBorderProps) 
{
    return (
        <>
            <Flex
                p={p}
                justify="center"
                align="center"
                width={width}
                height={height}
                bg={bg}
            >
                {children}
            </Flex>
        </>

    )

}
