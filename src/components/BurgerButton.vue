<template>
    <button class="burger" :class="{'burger-active': active}" @click="toggle()">
        <span class="line"></span>
        <span class="line"></span>
        <span class="line"></span>
    </button>
</template>

<script>
export default {
    name: "BurgerButton",
    props: {
        active: Boolean,
        toggle: Function
    }
}
</script>

<style lang="scss">
.burger {
    border: none;
    outline: none;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: transparent;
    width: 100%;
    height: 100%;
    padding: 0;
    

    .line {
        position: absolute;
        display: block;
        width: 100%;
        height: 1px;
        background-color: #fff;
        margin: 0 0.5em;
        transition: transform 0.3s ease-out, opacity 0.1s ease-out;
    }

    .line:nth-child(1) {
        transform: translateY(-10px);
    }

    .line:nth-child(3) {
        transform: translateY(10px);
    }
}

.burger.burger-active {
    .line:nth-child(1) {
        transform: translateY(0px) rotate(135deg);
    }

    .line:nth-child(2) {
        opacity: 0;
    }

    .line:nth-child(3) {
        transform: translateY(0px) rotate(-135deg);
    }
}

</style>