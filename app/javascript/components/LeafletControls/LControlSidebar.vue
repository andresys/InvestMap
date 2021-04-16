<template>
<div class="leaflet-control-sidebar" v-bind:class="{ open: isOpen, 'leaflet-left': position == 'left', 'leaflet-right': position == 'right'}" v-bind:style="{width: width + 'px'}">
  <slot />
</div>
</template>

<script>
import { Control, DomEvent } from 'leaflet'

export default {
  name: "LControlSidebar",
  data(){
    return {
    }
  },
  props: {
    width: {
      type: Number,
      custom: true,
      default: 350,
    },
    position: {
      type: String,
      custom: true,
      default: 'left'
    },
    open: {
      type: Boolean,
      custom: true,
      default: false
    },
  },
  mounted() {
    const LControl = Control.extend({
      element: undefined,
      onAdd() {
        return this.element
      },
      setElement(el) {
        this.element = el
      },
    })
    this.mapObject = new LControl({})
    this.parentContainer = this.$parent
    this.mapObject.setElement(this.$el)
    this.container = this.$parent.$el.querySelector('.leaflet-control-container')
    DomEvent.disableClickPropagation(this.$el);
    DomEvent.disableScrollPropagation(this.$el);
    // this.container.appendChild(this.mapObject.element)
    this.$nextTick(() => {
      this.$emit('ready', this.mapObject);
    });
  },
  computed: {
    isOpen: function() {
      if(this.container)
        this.container.style.cssText = (this.open ? "margin-" + this.position + ": " + this.width + "px" : "")
      return this.open
    }
  },
}
</script>
