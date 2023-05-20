import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import IncSlideProductDetail from "./include/_inc_slide";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCartStore } from "../../redux/cartSlice";
import Toast from "react-native-toast-message";
import RenderHTML from "react-native-render-html";
import React from "react";

const dimensions = Dimensions.get('window');
const width = dimensions.width;

const WebDisplay = React.memo(function WebDisplay({html}) {
    return (
        <RenderHTML
            contentWidth={width}
            source={{html}}
            tagsStyles={tagsStyles}
        />
    );
});

export default function ProductDetailScreen({route, navigation}) {
    const [qty, setQty] = useState(1);
    const [contentProduct, setContentProduct] = useState(null);
    const params = route.params;
    const product = params?.product;

    const _onPressIncreaseQty = (e) =>
    {
        setQty(qty+1);
    }

    const _onPressReduceQty = (e) =>
    {
        if (qty <= 0) return;
        setQty(qty-1);
    }

    const dispatch = useDispatch();

    const addToCart = async (product) => {

        let item = {
            name: product.name,
            id: product.id,
            avatar: product.avatar,
            quantity: qty,
            price: product.price
        }
        console.log('-------------- ', item);
        dispatch(addToCartStore(item));
        Toast.show({
            type: 'success',
            text1: 'Thông báo',
            text2: 'Thêm thành công 👋'
        });
    }

    const getContentProduct = async () => {
        if (product && product.content) setContentProduct(product.content);
    }

    useEffect(() => {
        getContentProduct().then(r => {});
    },[]);

    return (
        <ScrollView>
            <View style={{flex:1, backgroundColor: "#ffffff", marginTop: 0}}>
                <IncSlideProductDetail product={product} />
                <View style={{ padding: 15}}>
                    <View style={{ flex: 1, flexDirection: "row",justifyContent: "space-between", alignItems: "center"}}>
                        <Text style={{ color: "#484b64", fontWeight: "bold", fontSize: 18 }}>
                            {product?.name}
                        </Text>
                        <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                            <Image style={{ width: 16, height: 16}} source={require("./../../../assets/images/icon-star.png")} />
                            <Text>4.1</Text>
                            <Text>(21)</Text>
                            <TouchableOpacity
                                onPress={() => addToCart(product)}
                                style={{
                                width: 30,
                                height: 30,
                                backgroundColor: 'white',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 10,
                                borderWidth: 1
                            }}>
                                <Image style={{ width: 16, height: 16}} source={require("./../../../assets/images/icon-cart.png")} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.itemCategory} onPress={() => navigation.navigate('ProductListScreen')}>
                            <Text style={styles.itemCategoryItem}>{product?.category?.name || "Đang cập nhật"}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop:  15}}>
                        <Text style={{ color: "#484b64", fontWeight: "bold", fontSize: 16, marginBottom: 10 }}>Giá</Text>
                        <View style={{ flex: 1, justifyContent:  "space-between", alignItems: "center", flexDirection: "row"}}>
                            <Text style={{ color: "#484b64", fontWeight: "bold" }}>120.000 đ</Text>
                            <View>
                                <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                                    <TouchableOpacity style={styles.itemQty} onPress={()=>_onPressReduceQty()}>
                                        <Text style={styles.itemQtyText} >-</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.valueQty}>{qty}</Text>
                                    <TouchableOpacity style={styles.itemQty} onPress={()=>_onPressIncreaseQty()}>
                                        <Text style={styles.itemQtyText} >+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop:  15}}>
                        <Text style={{ color: "#484b64", fontWeight: "bold", fontSize: 16, marginBottom: 10 }}>Nội dung</Text>
                        <View style={{ flex: 1}}>
                            <Text>
                                {product?.description}
                            </Text>
                            <TouchableOpacity style={{ marginTop: 10}} onPress={() => navigation.navigate('HomeScreen')}>
                                <Text> Về trang chủ</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    itemCategory: {
        backgroundColor: '#d4edda',
        height: 20,
        padding: 2,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 8,
        alignSelf: 'flex-start'
    },
    itemCategoryItem: {
        color:"#28a745",
        fontSize: 13,
        fontWeight: "500",
    },
    itemQty: {
        alignItems: "center",
        justifyContent: "center",
        width: 30,
        height: 30,
        backgroundColor: "#f6f5fa",
        borderRadius: 10,
    },
    itemQtyText: {
        fontWeight: "bold",
        textAlign: "center",
        width: '100%',
        height: '100%',
        padding: 5
    },
    valueQty: {
        alignItems: "center",
        marginLeft: 2,
        marginRight: 2,
        textAlign: "center",
        paddingHorizontal: 10
    }
})
const tagsStyles = {
    a: {
        textDecorationLine: 'none',
    },
};
