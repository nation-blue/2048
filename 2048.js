function game2048(container)
{
    // 获得场景的块元素
    this.container = container;
    // 实例化一个数组 长度为16
    this.tiles = new Array(16);
}
 
game2048.prototype = {
    // 初始化方法
    init: function(){

        for(var i = 0, len = this.tiles.length; i < len; i++){
            // 新建一个小块，值为0
            var tile = this.newTile(0);
            // 设置属性 index ，赋值第几个
            tile.setAttribute('index', i);
            // 追加进场景元素中
            this.container.appendChild(tile);
            // 给数组赋值，值为新建的小块
            this.tiles[i] = tile;
        }
        // 随机创建一个有数字的块
        this.randomTile();
        this.randomTile();
    },
    newTile: function(val){
        // 创建一个div
        var tile = document.createElement('div');
        // 将 val 设置给新建好的块
        this.setTileVal(tile, val)
        // 返回创建好的块
        return tile;
    },
    setTileVal: function(tile, val){
        // 给块元素加 两个类名，一个统一的，一个区分的
        tile.className = 'tile tile' + val;
        // 设置属性 val 值为显示的数字
        tile.setAttribute('val', val);
        // 如果不是0.则赋值给元素的内容
        tile.innerHTML = val > 0 ? val : '';
    },
    randomTile: function(){
        // 新建数组，不定长，保存值为 0 的块
        var zeroTiles = [];
        for(var i = 0, len = this.tiles.length; i < len; i++){
            // 获取一下标签上保存值为 0 的块
            if(this.tiles[i].getAttribute('val') == 0){
                // 将值为0的元素，加入 zeroTiles 数组中
                zeroTiles.push(this.tiles[i]);
            }
        }
        // 从0元素的数组中，随机挑出一个
        var rTile = zeroTiles[Math.floor(Math.random() * zeroTiles.length)];
        // 给挑出的这个块，赋值一个 2 或 4
        this.setTileVal(rTile, Math.random() < 0.8 ? 2 : 4);
    },
    move:function(direction){
        var j;
        // 判断方向
        switch(direction){
            case 38:
                for(var i = 4, len = this.tiles.length; i < len; i++){
                    // 大于等于4的块
                    j = i;
                    while(j >= 4){
                        this.merge(this.tiles[j - 4], this.tiles[j]);
                        j -= 4;
                    }
                }
                break;
            case 40:
                for(var i = 11; i >= 0; i--){
                    j = i;
                    while(j <= 11){
                        this.merge(this.tiles[j + 4], this.tiles[j]);
                        j += 4;
                    }
                }
                break;
            case 37:
                for(var i = 1, len = this.tiles.length; i < len; i++){
                    j = i;
                    while(j % 4 != 0){
                        this.merge(this.tiles[j - 1], this.tiles[j]);
                        j -= 1;
                    }
                }
                break;
            case 39:
                for(var i = 14; i >= 0; i--){
                    j = i;
                    while(j % 4 != 3){
                        this.merge(this.tiles[j + 1], this.tiles[j]);
                        j += 1;
                    }
                }
                break;
        }
        // 随机生成一个元素块
        this.randomTile();
    },
    merge: function(prevTile, currTile){
        // 获取前一个的值
        var prevVal = prevTile.getAttribute('val');
        // 获取当前块的值
        var currVal = currTile.getAttribute('val');
        // 判断当前值不为0
        if(currVal != 0){
            // 之前的一个是0
            if(prevVal == 0){
                // 给之前的一个块,赋予当前的值
                this.setTileVal(prevTile, currVal);
                // 给当前的块,赋值为0
                this.setTileVal(currTile, 0);
            }
            // 当前的值和之前的值相同
            else if(prevVal == currVal){
                // 给之前的值赋值两倍的值
                this.setTileVal(prevTile, prevVal * 2);
                // 给当前的值赋值为0
                this.setTileVal(currTile, 0);
            }
        }
    },
    over: function(){
        for(var i = 0, len = this.tiles.length; i < len; i++){
            // 如果有块的值为0,则不结束
            if(this.tiles[i].getAttribute('val') == 0){
                return false;
            }
            // 除了 3 7 11 15
            if(i % 4 != 3){
                // 判断相邻元素值是否相等  若相等,则不结束
                if(this.equal(this.tiles[i], this.tiles[i + 1])){
                    return false;
                }
            }
            // 除了 12 13 14 15
            if(i < 12){
                // 数列相邻的值是否相等 若相等,则不结束
                if(this.equal(this.tiles[i], this.tiles[i + 4])){
                    return false;
                }
            }
        }
        return true;
    },
    equal: function(tile1, tile2){
        // 判断两个值是否相等
        return tile1.getAttribute('val') == tile2.getAttribute('val');
    },
    max: function(){
        for(var i = 0, len = this.tiles.length; i < len; i++){
            if(this.tiles[i].getAttribute('val') == 2048){
                return true;
            }
        }
    },
    clean: function(){
        for(var i = 0, len = this.tiles.length; i < len; i++){
            // 一个一个把子元素删除
            this.container.removeChild(this.tiles[i]);
        }
        // 新建一个长度为16的值
        this.tiles = new Array(16);
    }
}
 
var game, startBtn;
 
window.onload = function(){
    //获取场景元素
    var container = document.getElementById('div2048');
    // 获取开始按钮
    startBtn = document.getElementById('start');
    //添加点击事件
    startBtn.onclick = function(){
        // 隐藏开始键
        this.style.display = 'none';    
        // 实例化游戏类
        game = game || new game2048(container);
        // 调用初始化方法
        game.init();
    }
}
 
// 按下键盘
window.onkeydown = function(e){
    // 获取键码
    var keynum; 
    keynum = e.keyCode;

    // 如果键码属于上下左右四个键
    if ([37,38,39,40].indexOf(keynum) > -1) {
        // 如果游戏停止
        if(game.over()){
            // 调用清除内容的方法
            game.clean();
            // 开始按钮显示
            startBtn.style.display = 'block';
            // 按钮显示内容
            startBtn.innerHTML = '点击重新开始';
            // 终止函数
            return;
        }
        // 调用移动块的函数
        game.move(keynum);
    }
}