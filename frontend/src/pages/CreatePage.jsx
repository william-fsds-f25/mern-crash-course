import { Box, Button, Container, Heading, Input, useColorMode, useColorModeValue, useToast, VStack } from '@chakra-ui/react';
import React, { useState } from 'react'
import { useProductStore } from '../store/product';

const CreatePage = () => {

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const toast = useToast()

  const {createProduct} = useProductStore()

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct)
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true
      })
    }
    else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        isClosable: true
      });
    }
    setNewProduct({ name: "", price: "", image: "" });
    
  };

  return <Container maxW={"container.sm"}>
    <VStack
      spacing={8}
    >
      <Heading as={"h1"} size={"2x1"} textAlign={"center"} mb={8}>
        Create New Product
      </Heading>
      <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
        <VStack>
          <Input placeholder='Product Name' name='name' value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} /> /* Getting the name */
          <Input placeholder='Price' name='pame' type='number' value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} /> /* Getting the price */
          <Input placeholder='Image URL' name='image' value={newProduct.image} onChange={(e) =>  setNewProduct({...newProduct, image: e.target.value})}/> /* Getting the name */
          <Button colorScheme='blue' onClick={handleAddProduct} w='full'>Add product</Button>
        </VStack>
      </Box>
    </VStack>
  </Container>;
  
};

export default CreatePage
