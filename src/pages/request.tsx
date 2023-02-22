import { useNavigate } from "react-router-dom";
import { Dispatch, SetStateAction, useRef, useState, useEffect } from "react";
import { useColor } from "../hooks/useColor";
import { useFontSize } from "../hooks/useFontSize";
import { Flex, InputGroup, InputLeftElement, Alert, AlertIcon, Box, Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, Input, Text, Textarea, useColorModeValue } from "@chakra-ui/react";
import { useFormik } from "formik";
import useMarketplaceContract from "../hooks/useMarketplaceContract"
import { useEthConnection } from "../context/EthConnectionProvider";
import * as yup from "yup";
import { dev } from "../utils/log";
import { MdOutlineCreate as CreateIcon } from "react-icons/md";
import { FiFile as FileIcon } from "react-icons/fi";

const nftImageTypesAccepted = "image/jpeg,image/png,image/gif,image/svg,image/webp";


export default function Request() {
    const fileUploadInputRef = useRef<HTMLInputElement | null>(null);
    const color = useColor();
    const navigate = useNavigate();
    const { createNewNftCollection, progressCreateNftCollection } = useMarketplaceContract();
    const { isConnected } = useEthConnection();
    const formik = useFormik({
        initialValues: {
            name: "",
            symbol: "",
            description: ""
        },
        validationSchema: yup.object({
            name: yup.string().required("Required"),
            symbol: yup.string().required("Required"),
            description: yup.string()
        }),
        onSubmit: async ({ name, symbol, description }, { setFieldValue, setSubmitting }) => {
            try {
                const nftContract = await createNewNftCollection(name, symbol, description);
                if (!nftContract) {
                    throw new Error();
                } else {
                    setFieldValue("name", "");
                    setFieldValue("symbol", "");
                    setFieldValue("description", "");
                    navigate(`/collection/${nftContract?.address}`);
                }
            } catch (e) {
                dev.error(e);
            } finally {
                setSubmitting(false);
            }
        }
    });

    return (
        <Box as="main" padding={{ base: "4", md: "8" }} maxWidth="5xl" marginX="auto" >

            <Flex justifyContent={'center'} width={'900px'} borderRadius="lg" paddingX="6" paddingY="8" color={color.mainText} >
                <form onSubmit={formik.handleSubmit}>
                    <Heading fontSize="5xl">Request Offer</Heading>
                    <FormControl marginTop="8" isRequired>
                        <FormLabel>Address</FormLabel>
                        <Input name="name" autoComplete="off" placeholder="Smart Contract Address" />
                    </FormControl>
                    <FormControl marginTop="6" isInvalid={false} isRequired >
                            <Input type="file" placeholder="choose your image" />
                    </FormControl>
                    <FormControl marginTop="8" isRequired>
                        <FormLabel>Discord</FormLabel>
                        <Input name="name" autoComplete="off" placeholder="" />
                    </FormControl>
                    <FormControl marginTop="8" isRequired>
                        <FormLabel>Facebook</FormLabel>
                        <Input name="name" autoComplete="off" placeholder="" />
                    </FormControl>
                    <FormControl marginTop="8" isRequired>
                        <FormLabel>Instagram</FormLabel>
                        <Input name="name" autoComplete="off" placeholder="" />
                    </FormControl>
                    <Button bg={color.button2} color={color.button2} marginLeft="auto" marginTop="8" type="submit" onClick={() => { formik.handleSubmit(); }} isLoading={progressCreateNftCollection} disabled={progressCreateNftCollection} loadingText="Creating" rightIcon={<CreateIcon size="18" />} display="flex" alignItems="center">
                        submit
                    </Button>
                </form>
            </Flex>
        </Box>
    )
}