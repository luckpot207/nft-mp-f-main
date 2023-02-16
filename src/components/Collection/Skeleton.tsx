import { Grid, GridItem, Skeleton } from "@chakra-ui/react";

export function NftCollectionSkeleton() {
  return (
    <Grid as="main" padding={{ base: "4", md: "8" }} maxWidth="5xl" marginX="auto" gap="6" templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }} marginTop="8">
      {Array(3).fill(0).map((_, index) => (
        <GridItem key={index} width="full" wordBreak="break-word" height="32rem">
          <Skeleton width="full" height="full" />
        </GridItem>
      ))}
    </Grid>
  )
}