<template>
    <div class="main">
        <div class="login-wrap">
            <div class="login-html">
                <input id="tab-1" type="radio" name="tab" class="sign-in" checked />
                <label for="tab-1" class="tab">登录</label>
                <input id="tab-2" type="radio" name="tab" class="sign-up" />
                <label for="tab-2" class="tab">注册</label>
                <div class="login-form">
                    <div class="sign-in-htm">
                        <div class="group">
                            <label for="user" class="label">用户名</label>
                            <input id="user" type="text" class="input" v-model="model.username" />
                        </div>
                        <div class="group">
                            <label for="pass" class="label">密码</label>
                            <input id="pass" type="password" class="input" v-model="model.password"  data-type="password" />
                        </div>
                        <div class="group">
                            <input id="check" type="checkbox" class="check" @change="changeChecked" :checked="isChecked" />
                            <label for="check">
                                <span class="icon"></span> 记住密码
                            </label>
                        </div>
                        <div class="group">
                            <input type="submit" @click="login" class="button" value="登录" />
                        </div>
                        <div class="hr"></div>
                        <div class="foot-lnk">
                            <a href="#forgot">忘记密码?</a>
                        </div>
                    </div>
                    <div class="sign-up-htm">
                        <div class="group">
                            <label for="username" class="label">用户名</label>
                            <input id="username" type="text" class="input" />
                        </div>
                        <div class="group">
                            <label for="password" class="label">密码</label>
                            <input id="password" type="password" class="input" data-type="password" />
                        </div>
                        <div class="group">
                            <label for="repeatPassword" class="label">确认密码</label>
                            <input id="repeatPassword" type="password" class="input" data-type="password" />
                        </div>
                        <div class="group">
                            <label for="email" class="label">邮箱</label>
                            <input id="email" type="text" class="input" />
                        </div>
                        <div class="group">
                            <input type="submit" @click="signUp" class="button" value="注册" />
                        </div>
                        <div class="hr"></div>
                        <div class="foot-lnk">
                            <label for="tab-1">已经注册?</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="stars">
            <div class="star" v-for="(item,index) in starsCount" :key="index" ref="star"></div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        let keepPassword = localStorage.getItem('keepPassword')
        keepPassword = keepPassword == 'true' ? true : false
        return {
            model: {
                username: '',
                password: ''
            },
            isChecked: keepPassword,
            starsCount: 800, //数量
            distance: 600 //间距
        };
    },
    mounted() {
        const userInfo = JSON.parse(localStorage.getItem('user'))
        const keepPassword = localStorage.getItem('keepPassword')
        if (userInfo && keepPassword) {
            this.model = Object.assign({}, this.model, userInfo)
        }
        this.initStar()
    },
    methods: {
        initStar() {
            let starArr = this.$refs.star;
            starArr.forEach(item => {
                var speed = 0.2 + Math.random() * 1;
                var distance = this.distance + Math.random() * 300;
                item.style.transformOrigin = `0 0 ${distance}px`;
                item.style.transform = `translate3d(0,0,-${distance}px) rotateY(${Math.random() *
                    360}deg) rotateX(${Math.random() *
                    -50}deg) scale(${speed},${speed})`;
            });
        },
        changeChecked(event) {
            this.isChecked = event.target.checked
            localStorage.setItem('keepPassword', this.isChecked)
        },
        login() {
            this.$http.post('login', this.model).then(res => {
                const {token} = res
                if (this.isChecked) {
                    localStorage.setItem('user', JSON.stringify(this.model))
                } else {
                    localStorage.removeItem('user')
                }
                localStorage.setItem('token', token)
                this.$message.success('登录成功')
                this.$router.push('/')
            }).catch(error => {
                const {data} = error
                this.$message.error(data && data.message || '登录失败')
            })
        },
        signUp() {

        }
    }
};
</script>
<style lang="scss" scoped>
input,
button {
    outline: none;
    border: none;
}
.login-wrap {
    width: 100%;
    margin: auto;
    max-width: 525px;
    min-height: 670px;
    position: relative;
    background: url("../../assets/bg.jpg") no-repeat center;
    box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.24),
        0 17px 50px 0 rgba(0, 0, 0, 0.19);
}

.login-html {
    //   width: 100%;
    //   height: 80%;
    width: 385px;
    height: 530px;
    position: absolute;
    padding: 90px 70px 50px;
    background: rgba(40, 57, 101, 0.9);
}

.login-html .sign-in-htm,
.login-html .sign-up-htm {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: absolute;
    -webkit-transform: rotateY(180deg);
    transform: rotateY(180deg);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transition: all 0.4s linear;
    transition: all 0.4s linear;
}

.login-html .sign-in,
.login-html .sign-up,
.login-form .group .check {
    display: none;
}

.login-html .tab,
.login-form .group .label,
.login-form .group .button {
    text-transform: uppercase;
}

.login-html .tab {
    font-size: 22px;
    margin-right: 15px;
    padding-bottom: 5px;
    margin: 0 15px 10px 0;
    display: inline-block;
    border-bottom: 2px solid transparent;
}

.login-html .sign-in:checked + .tab,
.login-html .sign-up:checked + .tab {
    color: #fff;
    border-color: #1161ee;
}

.login-form {
    min-height: 345px;
    position: relative;
    -webkit-perspective: 1000px;
    perspective: 1000px;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
}

.login-form .group {
    margin-bottom: 15px;
}

.login-form .group .label,
.login-form .group .input,
.login-form .group .button {
    width: 100%;
    color: #fff;
    display: block;
}

.login-form .group .input,
.login-form .group .button {
    border: none;
    padding: 15px 20px;
    border-radius: 25px;
    background: rgba(255, 255, 255, 0.1);
}

.login-form .group input[data-type="password"] {
    text-security: circle;
    -webkit-text-security: circle;
}

.login-form .group .label {
    color: #aaa;
    font-size: 12px;
}

.login-form .group .button {
    background: #1161ee;
    cursor: pointer;
}

.login-form .group label .icon {
    width: 15px;
    height: 15px;
    border-radius: 2px;
    position: relative;
    display: inline-block;
    background: rgba(255, 255, 255, 0.1);
}

.login-form .group label .icon:before,
.login-form .group label .icon:after {
    content: "";
    width: 10px;
    height: 2px;
    background: #fff;
    position: absolute;
    -webkit-transition: all 0.2s ease-in-out 0s;
    transition: all 0.2s ease-in-out 0s;
}

.login-form .group label .icon:before {
    left: 3px;
    width: 5px;
    bottom: 6px;
    -webkit-transform: scale(0) rotate(0);
    -ms-transform: scale(0) rotate(0);
    transform: scale(0) rotate(0);
}

.login-form .group label .icon:after {
    top: 6px;
    right: 0;
    -webkit-transform: scale(0) rotate(0);
    -ms-transform: scale(0) rotate(0);
    transform: scale(0) rotate(0);
}

.login-form .group .check:checked + label {
    color: #fff;
}

.login-form .group .check:checked + label .icon {
    background: #1161ee;
}

.login-form .group .check:checked + label .icon:before {
    -webkit-transform: scale(1) rotate(45deg);
    -ms-transform: scale(1) rotate(45deg);
    transform: scale(1) rotate(45deg);
}

.login-form .group .check:checked + label .icon:after {
    -webkit-transform: scale(1) rotate(-45deg);
    -ms-transform: scale(1) rotate(-45deg);
    transform: scale(1) rotate(-45deg);
}

.login-html
    .sign-in:checked
    + .tab
    + .sign-up
    + .tab
    + .login-form
    .sign-in-htm {
    -webkit-transform: rotate(0);
    -ms-transform: rotate(0);
    transform: rotate(0);
}

.login-html .sign-up:checked + .tab + .login-form .sign-up-htm {
    -webkit-transform: rotate(0);
    -ms-transform: rotate(0);
    transform: rotate(0);
}

.hr {
    height: 2px;
    margin: 60px 0 50px;
    background: rgba(255, 255, 255, 0.2);
}

.foot-lnk {
    text-align: center;
}

.main {
    width: 100%;
    min-width: 1200px;
    height: 100%;
    padding-top: 3rem;
    background-color: #fff;
    background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
    overflow: hidden;
    filter: drop-shadow(0 0 10px white);
    position: relative;
    .main-title {
        position: absolute;
        left: 50%;
        top: 70px;
        transform: translateX(-50%);
        font-size: 30px;
        color: rgba(255, 255, 255, 1);
        &::after {
            content: "";
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: -28px;
            width: 28px;
            height: 4px;
            background: rgba(244, 54, 63, 1);
            border-radius: 2px;
        }
    }
    .stars {
        transform: perspective(500px);
        transform-style: preserve-3d;
        position: absolute;
        perspective-origin: 50% 100%;
        left: 50%;
        animation: rotate 90s infinite linear;
        bottom: -256px;
        .star {
            width: 2px;
            height: 2px;
            background: #f7f7b8;
            position: absolute;
            top: 0;
            left: 0;
            backface-visibility: hidden;
        }
        @keyframes rotate {
            0% {
                transform: perspective(400px) rotateZ(20deg) rotateX(-40deg)
                    rotateY(0);
            }
            100% {
                transform: perspective(400px) rotateZ(20deg) rotateX(-40deg)
                    rotateY(-360deg);
            }
        }
    }
    .ad-info {
        font-size: 15px;
        line-height: 24px;
        margin-top: 180px;
        color: rgba($color: #fff, $alpha: 0.8);
        text-align: center;
    }

    .dot-num {
        // position: relative;
        // height: 200px;
        // width: 100%;
        .dot {
            position: absolute;
            top: 0;
            display: inline-block;
            .dot-title {
                font-size: 40px;
                line-height: 37px;
                font-weight: bold;
                color: #f23340;
            }
            .dot-describe {
                margin-top: 10px;
                line-height: 20px;
                color: rgba($color: #fff, $alpha: 0.8);
                font-size: 14px;
            }
        }
    }
}
</style>
