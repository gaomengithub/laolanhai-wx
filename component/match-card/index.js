
Component({
  properties: {
    img: String,
    title: String,
    date: String,
    address: String,
    avatars: Array,
    matchID: String,
    matchType: {
      type: Number,
      value: 2
    },
  },
  data: {
    typeClass: "",
  },
  lifetimes:{
    attached: function () {
      switch (this.data.matchType) {
        case 0:
          this.setData({
            typeClass: 'official'
          });
          break;
        case 3:
          this.setData({
            typeClass: 'unofficial'
          });
          break;
      }
    },
  },

  methods: {

  }
})