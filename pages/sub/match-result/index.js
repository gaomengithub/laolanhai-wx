import { createStoreBindings } from "mobx-miniprogram-bindings";
import { match } from "$/stores//match-store"
Page({
  data: {
    // active: ['1', '2','3'],
    active: 0,
    description: `哗啦啦~😄 猜猜看👀，哪个宇宙🌌中最热血、最激情燃烧的地方走出了我这个你的小可爱私人助理？瞧瞧！就在这片热🔥与汗💦交织的战场🏀⛹️‍♂️—"篮球馆"☄️。

    哒哒哒哒哒，揭开这个篮球馆🏀的神秘面纱，可是一种怎样的感觉呢？🤔 当你踏进这里💼，你就仿佛成了这个球场上的篮球明星🌟。无论是初级玩家还是高级球员，这里总能给你带来脸红心跳😳😍的新鲜体验。
    
    宽敞的场地✔️，满满的热情🔥，还有每个击打篮球🏀的声音，都在告诉你这里是锻炼💪和打破自我🌈的最佳场所。小熊猫鄙视链三连，轻松毙敌！不管你是不是篮球新手👶，这里都是你实现篮球梦想🏆的起跑线。
    
    嘿，👋勇敢的小伙伴们，还在等什么呢？快来这个让你心跳加速💓，仿佛穿越🏃‍♀️到NBA场地中央的篮球馆吧！来吧，把你的梦想🌠和汗水💦，一起汇成这个暑假☀️最独特的篮球馆记忆🏀🎈。`,
    steps: [
      {
        text: '时间-球队',
        desc: '描述事件',
      },
      {
        text: '时间-球队',
        desc: '描述事件',
      },
      {
        text: '时间-球队',
        desc: '描述事件',
      },
      {
        text: '时间-球队',
        desc: '描述事件',
      },
    ],
  },



  onChange(event) {
    this.setData({
      active: event.detail,
    });
  },
  onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store: match,
      fields: ["matchResult",],
      actions: ["updateMatchResult"]
    });
    if (options.id) {
      this.updateMatchResult(options.id)
    }
  },

  onUnload() {
    this.storeBindings.destroyStoreBindings();
  },
  afterRead(e) {
    const { file } = e.detail;
    this.updateMatchResult(file)
  },
  deleteImg(e) {
    const index = e.detail.index
    this.updateMatchResult(index)
  },

})