// 选择组件配置
const selectOptions = {
    'cancleorder': {
        tip: '请选择理由',
        url: '',
        options: [
            {
                id: 0,
                value: '实物不符'
            },
            {
                id: 1,
                value: '质量原因'
            },
            {
                id: 2,
                value: '现在不想买了'
            },
            {
                id: 3,
                value: '商品价格较贵'
            },
            {
                id: 4,
                value: '重复下单'
            }
        ]
    },
    'area': {
        tip: '请选择',
        url: '/user/address/getRegion',
        options: [],
        getOptions: (data) => {
            if (data.code == 0) {
                return data.data.region
            } else {
                return [];
            }
        }
    }
};

export default selectOptions;