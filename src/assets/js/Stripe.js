let token = null

if(process.env.NODE_ENV === 'production') {
    token = 'pk_live_wGAGFBr2k2VYqgL8bICo0cl300UiMGgMyG'
} else {
    token = 'pk_test_skuFEKk7Hjq2nqdRkWFcda7c00hkDhu1Vh'
}

export default Stripe(token);