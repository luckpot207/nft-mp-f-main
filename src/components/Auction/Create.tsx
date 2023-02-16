import { useNavigate } from "react-router-dom";
import { Alert, AlertIcon, Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, useColorModeValue } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as yup from "yup";
import { MdOutlineCreate as CreateIcon } from "react-icons/md";
import useMarketplaceContract from "../../hooks/useMarketplaceContract"
import { useEthConnection } from "../../context/EthConnectionProvider";
import { dev } from "../../utils/log";

export function Create() {
  const backgroundColor = useColorModeValue("white", "gray.700");
  const navigate = useNavigate();
  const { createNewAuction, progressCreateAuction } = useMarketplaceContract();
  const { isConnected } = useEthConnection();
  const formik = useFormik({
    initialValues: {
      contract: "",
      tokenId: "",
      startingBid: ""
    },
    validationSchema: yup.object({
      contract: yup.string().required("Required"),
      tokenId: yup.string().required("Required"),
      startingBid: yup.string()
    }),
    onSubmit: async ({ contract, tokenId, startingBid }, { setFieldValue, setSubmitting }) => {
      try {
        const nftContract = await createNewAuction(contract, tokenId, startingBid);
        if (!nftContract) {
          throw new Error();
        } else {
          setFieldValue("contract", "");
          setFieldValue("tokenId", "");
          setFieldValue("startingBid", "");
          navigate(`/auction/id/${nftContract?.address}`);
        }
      } catch (e) {
        dev.error(e);
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <Box as="main" padding={{ base: "4", md: "8" }} maxWidth="5xl" marginX="auto" backgroundColor={backgroundColor}>
      {!isConnected ?
        <Alert colorScheme="brand" textAlign="center" status="warning" variant="solid">
          <AlertIcon />
          Your wallet needs to be connected to create new Auction!
        </Alert> :

        <Box maxWidth="2xl" marginX="auto" borderRadius="lg" paddingX="6" paddingY="8" >
          <form onSubmit={formik.handleSubmit}>
            <Heading fontSize="5xl" textAlign='center'>Create Auction</Heading>

            <FormControl marginTop="8" isInvalid={!!formik.errors.contract} isRequired>
              <FormLabel>Contract Address</FormLabel>
              <Input name="contract" value={formik.values.contract} onChange={formik.handleChange} autoComplete="off" placeholder="0x104d6F6E48b4daabe7c4Cc849b0d485f1af48605" />
              <FormErrorMessage>{formik.errors.contract}</FormErrorMessage>
            </FormControl>

            <FormControl marginTop="6" isInvalid={!!formik.errors.tokenId} isRequired>
              <FormLabel>Token Id</FormLabel>
              <Input name="tokenId" value={formik.values.tokenId} onChange={formik.handleChange} autoComplete="off" placeholder="5" />
              <FormErrorMessage>{formik.errors.tokenId}</FormErrorMessage>
            </FormControl>

            <FormControl marginTop="6" isInvalid={!!formik.errors.startingBid} isRequired>
              <FormLabel>Floor Bid Price</FormLabel>
              <Input name="startingBid" value={formik.values.startingBid} onChange={formik.handleChange} autoComplete="off" placeholder="0.01" />
              <FormErrorMessage>{formik.errors.startingBid}</FormErrorMessage>
            </FormControl>

            <Button colorScheme="brand" marginLeft="auto" marginTop="8" type="submit" onClick={() => { formik.handleSubmit(); }} isLoading={progressCreateAuction} disabled={progressCreateAuction} loadingText="Creating" rightIcon={<CreateIcon size="18" />} display="flex" alignItems="center">
              Create
            </Button>
          </form>
        </Box>
      }
    </Box>
  )
}