import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { CartContext } from '../CartProvider/CartContext';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Home() {
  const { addToCart } = useContext(CartContext);
  const navigation = useNavigation();

  const handleProductPress = (product) => {
    navigation.navigate('Productdetail', { product });
  };

  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProduct();
  }, []);

  const getAllProduct = () => {
    axios
      .get('https://fakestoreapi.com/products')
      .then(function (response) {
        // handle success
        setProducts(response.data);
      })
      .catch(function (error) {
        // handle error
        alert(error.message);
      });
  };

  const handleBuyNow = (product) => {
    addToCart(product); // Gọi hàm addToCart từ context và truyền sản phẩm cần thêm vào giỏ hàng
  };

  return (
    <View>
      <ScrollView style={styles.scrollviewcontainer}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            {/* <View style={styles.header}>
              <Text style={styles.headerText}>Discover</Text>
              <Text style={styles.headerText}>Search</Text>
              <Text style={styles.headerText}>Clearance</Text>
              <Text style={styles.headerText}>Sales</Text>
            </View> */}
            <View style={styles.content}>
              <Text style={styles.TextBanner}>AK</Text>
              <Text style={styles.TextBanner}>Shop</Text>
              <TouchableOpacity style={styles.buttonBanner}>
              <Text style={styles.contentText}>Xem thêm</Text>

              </TouchableOpacity>
              <Image style={styles.BannerImage} source={require("../assets/banner.jpg")}></Image>
            </View>
            <View style={styles.categories}>
              <Text style={styles.categoriesText}>Danh mục</Text>
              <View style={styles.categoriesItems}>
                <ScrollView horizontal> 
                <Text style={styles.categoriesItem}>Tất cả</Text>
                <Text style={styles.categoriesItem}>Quần</Text>
                <Text style={styles.categoriesItem}>Áo</Text>
                <Text style={styles.categoriesItem}>Giày</Text>
                <Text style={styles.categoriesItem}>Mũ</Text>
                <Text style={styles.categoriesItem}>Mắt kính</Text>
                <Text style={styles.categoriesItem}>Quần Jeans</Text>
                <Text style={styles.categoriesItem}>Quần thể thao</Text>
                <Text style={styles.categoriesItem}>Áo thun</Text>
                <Text style={styles.categoriesItem}>Áo lạnh</Text>
                <Text style={styles.categoriesItem}>Quần tây</Text>
                <Text style={styles.categoriesItem}>Áo Polo</Text>
                <Text style={styles.categoriesItem}>Quần kaki</Text>
                <Text style={styles.categoriesItem}>Váy</Text></ScrollView>
               
              </View>
            </View>
            {/* <View style={styles.footer}>
              <Text style={styles.footerText}>Favorites</Text>
              <Text style={styles.footerText}>8</Text>
              <Text style={styles.footerText}>Profile</Text>
            </View> */}
          </View>
          {products.map((product) => (
            <TouchableOpacity
              style={styles.item}
              key={product.id}
              onPress={() => handleProductPress(product)}
            >
              <View>
                <Image style={styles.img} source={{ uri: product.image }} />
              </View>
              <View style={styles.des}>
                <Text style={styles.des_text}>{product.title}</Text>
                <Text style={styles.price}>Price: ${product.price.toFixed(2)}</Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.ratingText}>Rating: </Text>
                  <FontAwesome name="star" style={styles.starIcon} />
                  <Text style={styles.ratingValue}> {product.rating.rate.toFixed(1)}</Text>
                  <Text style={styles.ratingCount}>({product.rating.count} reviews)</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.cartButton}
                onPress={() => handleBuyNow(product)}
              >

              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollviewcontainer: {
    backgroundColor: '#C0C0C0',
  },
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  catetitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  item: {

    width: '48%',
    height: 320,
    marginBottom: 40,
    marginLeft: 5,
    backgroundColor: '#B8DECC',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  img: {
    width: '90%',
    height: 180,
    marginLeft: 10,
    marginTop: 10,
  },
  des: {
    padding: 10,
  },
  des_text: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  price: {
    fontSize: 14,
    marginBottom: 5,
    color: 'black',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    color: 'black',
  },
  ratingText: {
    fontSize: 12,
    marginRight: 5,
    color: 'black',
  },
  starIcon: {
    color: '#FFD700',
    fontSize: 12,
  },
  ratingValue: {
    fontSize: 12,
    color: 'blue',
  },
  ratingCount: {
    fontSize: 12,
    marginLeft: 5,
    color: '#0020BD',
  },

  //
  headerContainer: {
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  categories: {
    padding: 20,
  },
  categoriesText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoriesItems: {
    flexDirection: 'row',

  },
  categoriesItem: {
    textAlign:'center',
    padding: 10,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 3,
    borderRadius: 30,
    borderColor: 'green',
    fontSize: 14,
    color:'black',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  footerText: {
    fontSize: 16,
  },
  // content: {
  //   backgroundColor: '#75FD73',
  //   paddingHorizontal: 16,
  //   paddinVegrtical: 32,
  //   marginBottom: 10,
  //   borderRadius: 30,
  //   width: 'auto',
  //   height: 200,
  // },
  contentText: {
    fontSize: 16,
    color:'#1D7C50',
    textAlign:'center',
  },
  // buttonBanner:{
  //   backgroundColor: 'white',
  //   width: 120,
  //   height: 45,
  //   borderRadius: 30,
  //   justifyContent:'center',
  //   marginTop: 30,
  //   marginLeft: 20,
  // },
  // TextBanner:{
  //   color: '#fff',
  //   fontSize: 40,
  //   fontWeight: 'bold',
  // },

  buttonBanner: {
    backgroundColor: 'white',
    width: 120,
    height: 45,
    borderRadius: 30,
    justifyContent: 'center',
    marginLeft: 20,
    bottom: 0, // Đặt vị trí dưới cùng
  },
  TextBanner: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
  },
  content: {
    backgroundColor: '#1D7C50',
    paddingHorizontal: 16,
    paddingVertical: 32, // Sửa lỗi chính tả
    marginBottom: 10,
    marginTop: 20,
    borderRadius: 30,
    width: 'auto',
    height: 200,
    position: 'relative', // Thêm kiểu vị trí relative
  },
  BannerImage: {
    position: 'absolute', // Thêm kiểu vị trí absolute
    bottom: 0, // Đặt vị trí dưới cùng
    right: 0, // Đặt vị trí bên phải
    width: 220,
    height: 200,
  },

});