import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import user from './Modules/User/User';
import video from './Modules/Video/Video';
import upload from './Modules/Upload/Upload';
import info from './Modules/Setting/Info';
import slide from './Modules/Setting/Slide';
import category from './Modules/Service/Category/Category';
import service from './Modules/Service/Service';
import faq from './Modules/Product/Faq/Faq';
import feature from './Modules/Product/Feature/Feature';
import group from './Modules/Product/Group/Group';
import product from './Modules/Product/Product';
import ui from './Modules/Ui/Ui';
export const store = new Vuex.Store({
    state : {},
    modules : {
        user,
        faq,
        video,
        upload,
        slide,
        info,
        feature,
        group,
        category,
        service,
        product,
        ui
    }
});