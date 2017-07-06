// app基础js及css
import '../../lib/base';

$('#root').html('Hello World3!');;

// 热更新
if(module.hot) {
    module.hot.accept();
}