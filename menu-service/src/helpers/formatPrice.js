function formatPrice(price) {
    return +(Math.round(price + "e+2")  + "e-2");
}

export default formatPrice;