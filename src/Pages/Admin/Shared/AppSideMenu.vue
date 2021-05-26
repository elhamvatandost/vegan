<template>
  <v-list dense>
    <router-link tag="v-list-item" active-class="active" :to="{name : 'customer'}" exact>
      <v-list-item-action>
        <v-icon>mdi mdi-account-network</v-icon>
      </v-list-item-action>

      <v-list-item-content>
        <v-list-item-title>مشتریان</v-list-item-title>
      </v-list-item-content>
    </router-link>
    <v-list-group prepend-icon=">mdi mdi-account-multiple" no-action>
      <template v-slot:activator>
        <v-list-item-content>
          <v-list-item-title>کاربران</v-list-item-title>
        </v-list-item-content>
      </template>
      <router-link tag="v-list-item" active-class="active" :to="{name : 'profile'}" exact>
        <v-list-item-content>
          <v-list-item-title>پروفایل</v-list-item-title>
        </v-list-item-content>
      </router-link>
      <router-link tag="v-list-item" active-class="active" :to="{name : 'admin'}" exact>
        <v-list-item-content>
          <v-list-item-title>مدیریت کاربران</v-list-item-title>
        </v-list-item-content>
      </router-link>
    </v-list-group>
    <v-list-group prepend-icon=">mdi mdi-puzzle" no-action>
      <template v-slot:activator>
        <v-list-item-content>
          <v-list-item-title>خدمات</v-list-item-title>
        </v-list-item-content>
      </template>
      <router-link tag="v-list-item" active-class="active" :to="{name : 'service-group'}">
        <v-list-item-content>
          <v-list-item-title>گروه خدمات</v-list-item-title>
        </v-list-item-content>
      </router-link>
      <router-link tag="v-list-item" active-class="active" :to="{name : 'service'}" exact>
        <v-list-item-content>
          <v-list-item-title>خدمت</v-list-item-title>
        </v-list-item-content>
      </router-link>
    </v-list-group>
    <v-list-group prepend-icon=">mdi mdi-shopping" no-action>
      <template v-slot:activator>
        <v-list-item-content>
          <v-list-item-title>محصولات</v-list-item-title>
        </v-list-item-content>
      </template>
      <router-link tag="v-list-item" active-class="active" :to="{name : 'product-group'}" exact>
        <v-list-item-content>
          <v-list-item-title>گروه محصولات</v-list-item-title>
        </v-list-item-content>
      </router-link>
      <router-link tag="v-list-item" active-class="active" :to="{name : 'product'}" exact>
        <v-list-item-content>
          <v-list-item-title>محصول</v-list-item-title>
        </v-list-item-content>
      </router-link>
      <router-link tag="v-list-item" active-class="active" :to="{name : 'product-feature'}" exact>
        <v-list-item-content>
          <v-list-item-title>ویژگی و مزایا</v-list-item-title>
        </v-list-item-content>
      </router-link>
    </v-list-group>
    <router-link tag="v-list-item" active-class="active" :to="{name : 'upload'}" exact>
      <v-list-item-action>
        <v-icon>mdi mdi-folder-upload</v-icon>
      </v-list-item-action>

      <v-list-item-content>
        <v-list-item-title>بارگذاری</v-list-item-title>
      </v-list-item-content>
    </router-link>
    <router-link tag="v-list-item" active-class="active" :to="{name : 'video'}">
      <v-list-item-action>
        <v-icon>mdi mdi-file-video</v-icon>
      </v-list-item-action>

      <v-list-item-content>
        <v-list-item-title>ویدیوها</v-list-item-title>
      </v-list-item-content>
    </router-link>
    <router-link tag="v-list-item" active-class="active" :to="{name : 'faq'}">
      <v-list-item-action>
        <v-icon>mdi mdi-human-male-female</v-icon>
      </v-list-item-action>

      <v-list-item-content>
        <v-list-item-title>پرسش و پاسخ</v-list-item-title>
      </v-list-item-content>
    </router-link>
    <v-list-group prepend-icon=">mdi mdi-settings" no-action>
      <template v-slot:activator>
        <v-list-item-content>
          <v-list-item-title>تنظیمات</v-list-item-title>
        </v-list-item-content>
      </template>
      <router-link tag="v-list-item" active-class="active" :to="{name : 'info'}" exact>
        <v-list-item-content>
          <v-list-item-title>اطلاعات</v-list-item-title>
        </v-list-item-content>
      </router-link>
      <router-link tag="v-list-item" active-class="active" :to="{name : 'slide'}" exact>
        <v-list-item-content>
          <v-list-item-title>اسلایدها</v-list-item-title>
        </v-list-item-content>
      </router-link>
    </v-list-group>
  </v-list>
</template>

<script>
export default {};
</script>
<style scoped>
.active {
  background-color: #ccc6c6;
}
</style>