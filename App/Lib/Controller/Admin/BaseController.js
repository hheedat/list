module.exports = Controller(function(){
    'use strict';
    return {
        init: function(http){
            this.super('init', http);
            /**
             * ������ͨ���߼�
             */
            //login�����жϵ�ǰ�Ƿ��Ѿ���¼
            if (this.http.action === 'login') {
                return;
            }

            var self = this;
            return self.session('userInfo').then(function (userInfo) {
                //�û���ϢΪ��
                if (isEmpty(userInfo)) {
                    //ajax���ʷ���һ��json�Ĵ�����Ϣ
                    if (self.isAjax()) {
                        return self.error(403);
                    } else {
                        //��ת����¼ҳ
                        return self.redirect('login');
                    }
                } else {
                    //�û��Ѿ���¼
                    self.userInfo = userInfo;
                    self.assign('userInfo', userInfo);
                }
            });
        }
    }
})