(() => {
  // don't bother loading the JS if css custom properties are not supported, since the app relies on them
  if (CSS.supports && CSS.supports("color", "var(--red)")) {
    // event hub/bus
    const hub = new Vue();

    // header
    Vue.component("appHead", {
      template: "#header-temp",
      props: ["title"] });


    // hair style options
    Vue.component("hairStyles", {
      template: "#styles-temp",
      props: ["updatestyles", "selected"],
      data() {
        return {
          hairdos: [
          {
            name: "ponytail",
            desc: "low ponytail" },

          {
            name: "short-straight",
            desc: "bob" },


          {
            name: "long-straight",
            desc: "long and straight" },


          {
            name: "bun",
            desc: "top knot" },

          {
            name: "waves",
            desc: "medium-long and wavy" }

          // disable fro until I fix the mini icon on mobile

          //             {
          //               name: "fro",
          //               desc: "wavey afro"
          //             }
          ] };

      } });


    // person / character
    Vue.component("person", {
      template: "#person-temp",
      props: ["currenthairdo"] });


    // skin color range
    Vue.component("skintone", {
      template: "#skin-temp",
      props: ["shade"],
      methods: {
        changeShade(e) {
          hub.$emit("changeshade", e.target.value);
        } } });



    // individual hair style option
    Vue.component("hairStyle", {
      template: "#style-temp",
      props: ["hairdo", "selected"],
      methods: {
        changeStyle(e) {
          hub.$emit("changestyle", e.target.value);
        } } });



    // hair style icon
    Vue.component("hair-icon", {
      template: "#hair-icon-temp",
      props: ["hairdo"] });


    // hair color picker
    Vue.component("hairColor", {
      template: "#haircolor-temp",
      props: ["color"],
      data() {
        return {
          isText: false };

      },
      methods: {
        changeColor(e) {
          // if color input is displayed properly, do your thang
          if (!this.isText) {
            hub.$emit("changecolor", e.target.value);
          } else {
            // otherwise, a text field is displayed and we need to validate the value before attempting to update the hair color
            const color = this.isValidColor(e.target.value);
            if (color) {
              hub.$emit("changecolor", color);
            }
          }
        },
        isTextInput() {
          // tests if browser displays color input as a plain text field so styles can be adjusted accordingly
          const el = document.createElement("input");
          el.setAttribute("type", "color");
          document.body.appendChild(el);
          const computed = window.getComputedStyle(el);
          const appearance = computed.getPropertyValue("-webkit-appearance");
          const type = el.type;
          document.body.removeChild(el);

          return appearance === "textfield" || type === "text";
        },
        isValidColor(val) {
          const strNoSpaces = val.replace(/\s/g, "");
          // quick and dirty; doesn't clamp rgb values at 255 or hsl % values at 100
          const hexRgbHsl = /(?:^rgb\([0-9]{1,3},[0-9]{1,3},[0-9]{1,3}\)$)|(?:^#(?:[a-f0-9]{6}|[a-f0-9]{3})$)|(?:^hsl\([0-9]{1,3},[0-9]{1,3}%,[0-9]{1,3}%\)$)/gi;

          // test against hex/rgb/hsl first since they're more commonly used than CSS color keywords
          if (strNoSpaces.match(hexRgbHsl)) {
            return strNoSpaces;
          } else {
            // test against color keywords
            const colors = `aliceblue,antiquewhite,aqua,aquamarine,azure,beige,bisque,black,blanchedalmond,blue,blueviolet,brown,burlywood,cadetblue,chartreuse,chocolate,coral,cornflowerblue,cornsilk,crimson,cyan,darkblue,darkcyan,darkgoldenrod,darkgray,darkgreen,darkgrey,darkkhaki,darkmagenta,darkolivegreen,darkorange,darkorchid,darkred,darksalmon,darkseagreen,darkslateblue,darkslategray,darkslategrey,darkturquoise,darkviolet,deeppink,deepskyblue,dimgray,dimgrey,dodgerblue,firebrick,floralwhite,forestgreen,fuchsia,gainsboro,ghostwhite,gold,goldenrod,gray,green,greenyellow,grey,honeydew,hotpink,indianred,indigo,ivory,khaki,lavender,lavenderblush,lawngreen,lemonchiffon,lightblue,lightcoral,lightcyan,lightgoldenrodyellow,lightgray,lightgreen,lightgrey,lightpink,lightsalmon,lightseagreen,lightskyblue,lightslategray,lightslategrey,lightsteelblue,lightyellow,lime,limegreen,linen,magenta,maroon,mediumaquamarine,mediumblue,mediumorchid,mediumpurple,mediumseagreen,mediumslateblue,mediumspringgreen,mediumturquoise,mediumvioletred,midnightblue,mintcream,mistyrose,moccasin,navajowhite,navy,oldlace,olive,olivedrab,orange,orangered,orchid,palegoldenrod,palegreen,paleturquoise,palevioletred,papayawhip,peachpuff,peru,pink,plum,powderblue,purple,red,rosybrown,royalblue,saddlebrown,salmon,sandybrown,seagreen,seashell,sienna,silver,skyblue,slateblue,slategray,slategrey,snow,springgreen,steelblue,tan,teal,thistle,tomato,turquoise,violet,wheat,white,whitesmoke,yellow,yellowgreen`;
            const reg = new RegExp(`\\b${strNoSpaces}\\b`);
            const matches = colors.match(reg);
            return matches ? matches[0] : false;
          }
        } },

      created() {
        this.isText = this.isTextInput();
      } });


    // download btn
    Vue.component("save", {
      template: "#save-temp",
      props: ["saveimg"],
      data() {
        return {
          canSave: null };

      },
      methods: {
        canSaveTest() {
          // make sure browser can convert the DOM node to an image; otherwise don't show save btn
          domtoimage.toBlob(document.body).then(
          () => {
            this.canSave = true;
          },
          () => {
            this.canSave = false;
          });

        } },

      created() {
        this.canSaveTest();
      } });


    const app = new Vue({
      el: "#app",
      data() {
        return {
          picked: {},
          title: `Vue 'Do`,
          storage: {} };

      },
      methods: {
        updateStorage() {},
        updateStyle(style) {
          this.picked.currentStyle = style;
        },
        updateShade(newShade) {
          this.picked.skinShade = newShade;
        },
        updateColor(color) {
          this.picked.currentColor = color;
        },
        downloadImg() {
          const el = this.$refs.person.$el;
          const opts = {
            style: {
              maxWidth: "none",
              margin: "0 " } };



          domtoimage.toBlob(el, opts).then(blob => {
            window.saveAs(blob, "vue-do__my-character.png");
          });
        } },

      computed: {
        lightness() {
          return `${this.picked.skinShade * 10}%`;
        } },

      watch: {
        picked: {
          handler() {
            if (this.storage.canStore) {
              this.updateStorage();
            }
          },
          deep: true } },


      beforeCreate() {},
      created() {
        // default options
        let opts = {
          currentStyle: "ponytail",
          currentColor: "#293a97",
          skinShade: 7 };


        // using this method vs. typeof localStorage so it will also work in cases where localStorage is supported, but disabled
        try {
          window.localStorage.setItem("owlsayswoot", "wooot?");
          window.localStorage.removeItem("owlsayswoot");

          this.storage.canStore = true;
          this.storage.dataKey = "vue_doJS-picked";
        } catch (e) {
        }

        if (this.storage.canStore) {
          // set the options to localStorage if someone has already visited and changed styles
          const stored = window.localStorage.getItem(this.storage.dataKey);

          if (stored) {
            opts = JSON.parse(stored);
          }
          // create method to set localStorage when any of the data changes
          this.updateStorage = () => {
            window.localStorage.setItem(
            this.storage.dataKey,
            JSON.stringify(this.picked));

          };
        }

        // set our hair style, color, and skin color to either default or localStorage options
        this.picked = opts;
      },
      mounted() {
        hub.$on("changeshade", this.updateShade);
        hub.$on("changestyle", this.updateStyle);
        hub.$on("changecolor", this.updateColor);
      } });

  }
})();