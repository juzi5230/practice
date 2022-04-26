<template>
  <div>
    <Modal
      v-model="showDialog"
      title="设置打印样式"
      :width="1036"
      @on-ok="toPrint"
      @on-cancel="cancel">
      <div class="customer-dialog">
        <div class="left-set">
          <div class="part">
            <div class="title">节次类型：</div>
              <Radio-group v-model="formData.sectionType">
                <Radio class="two-col" :label="item.label" v-for="item in sectionList" :key="item.label + '_' +item.content">{{item.content}}</Radio>
              </Radio-group>
          </div>
          <div class="part">
            <div class="title mgT16">星期类型：</div>
            <Radio-group v-model="formData.weekDaysType">
              <Radio class="two-col" :label="item.label" v-for="item in weekList" :key="item.label + '_' +item.content">{{item.content}}</Radio>
            </Radio-group>
          </div>
          <div class="part">
            <div class="title mgT16">间隔：</div>
            <div v-for="(item, index) in formData.placeholder" class="mgT16">
              <span class="section-order">{{index + 1}}.</span> 在第<Input class="section-input" style="width: 36px" size="small" v-model="item.section" @on-focus="onfocus(index)" @on-blur="addPlaceholder(index)"></Input>节后添加间隔:
              <Input class="section-content" v-model="item.content" size="small" style="width:164px" placeholder="请输入" :maxlength="20"></Input>
            </div>
          </div>
          <div class="part">
            <div class="title mgT16">附注：</div>
            <div v-for="(item, index) in formData.annotations" :key="index + '_' + item">
              <Radio-group v-model="item.type">
                <Radio class="four-col" :label="ind" v-for="ind in ['none', 'left', 'center', 'right']" :key="ind + '_' + item">{{transAnnotations(index, ind)}}</Radio>
              </Radio-group>
              <Input v-model="item.content" style="width:337px" size="small" :maxlength="20" placeholder="请输入"></Input>
            </div>
          </div>
        </div>
        <div id="printContent" class="right-schedule">
          <div class="title"></div>
          <component
           v-if="childComponent && allData.kbLists"
           :is="childComponent"
           :showFirst="showFirst"
           v-bind="allData"
           :sectionType="formData.sectionType"
           :annotations="formData.annotations"
           @hook:mounted="getMounted"></component>
          <div class="footer"></div>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  export default {
    name: 'PrintPreview',
    props: ['showPrint', 'type'],
    data () {
      return {
        showDialog: false,
        childComponent: null,
        allData: {},
        showFirst: true,
        formData: {
          weekDaysType: '0',
          sectionType: '0',
          placeholder: [
            {
              section: '',
              content: '',
              rowNum: -1
            },
            {
              section: '',
              content: '',
              rowNum: -1

            },
            {
              section: '',
              content: '',
              rowNum: -1
            }
          ],
          annotations: [
            {
              type: 'none',
              content: ''
            },
            {
              type: 'none',
              content: ''
            }
          ]
        },
        weekDays: [
          ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天']
        ],
        sectionList: [
          {
            label: '0',
            content: '早1、2、3、4、5、6、7'
          },
          {
            label: '1',
            content: '早自习1、第1节、第2节'
          },
          {
            label: '2',
            content: '早自习第一节、第一节、第二节'
          },
          {
            label: '3',
            content: '早一、一、二、三、四、五'
          }
        ],
        weekList: [
          {
            label: '0',
            content: '周一、周二、周三'
          },
          {
            label: '1',
            content: '星期一、星期二、星期三'
          }
        ]
      }
    },
    watch: {
      showDialog (val) {
        this.$emit('update:showPrint', val)
      },
      showPrint (val) {
        this.showDialog = val
      },
      printData: {
        handler: function (val) {
          this.allData = JSON.parse(JSON.stringify(val))
        },
        deep: true
      },
      'formData.weekDaysType': function (val) {
        this.changeWeek(val)
      }
    },
    computed: {
      ...mapState(['printData'])
    },
    mounted () {
      let _this = this
      let type = _this.type
      if (type === 'myClass') type = 'class'
      if (type === 'myTeacher') type = 'teacher'
      import(`../pages/index/components/table/${type}ScheduleTable`).then(function (module) {
        _this.childComponent = module.default
      })
    },
    methods: {
      deletePlaceholder (section) {
        let tempData = this.transferData()
        for (let i = 0 ; i < tempData.length; i++) {
          let list = this.transList(i)
          for (let j = 0; j < list.detail.length; j++) {
            if (list.detail[j].nodeNum === section) {
              // 如果当前行后，有间隔， 
              this.reSetLarger(j + 1, i, -1)
              list.detail.splice(j + 1, 1) // 删除当前课程下一行的间隔
              let ind = this.allData.placeholder.indexOf(j + 1) // 删除保存的行号及section
              this.allData.placeholder.splice(ind, 1)
              this.allData.section.splice(ind, 1)
              // // 如果当前行后 有午休或练习等，需要将其值减1
              if (list.siesta && list.siesta > j)  list.siesta--
              if (list.siesta && list.exercise > j)  list.exercise--
              break
            }
          }
        }
      },
      addOnePlacholder (list, rowNum, i, index) {
          // 如果 当前添加的间隔所在位置 原有午休, 原有行 替换为间隔信息
          if(list.siesta) {
            this.formData.placeholder[index].rowNum = rowNum + 1
            list.detail[rowNum + 1] = this.formData.placeholder[index]
            list.siesta = ''
          }
          if(list.exercise) {
            this.formData.placeholder[index].rowNum = rowNum + 1
            list.detail[rowNum + 1] = this.formData.placeholder[index]
            list.exercise = ''
          }
            //   this.formData.placeholder[index].rowNum = j + 1
            //   this.allData.placeholder.push(j + 1) // 记录间隔所在行数
            //   this.allData.section.push(+section) // 记录间隔所在课节数
            //   list.detail.splice(j + 1, 0, this.formData.placeholder[index]) // 添加新的间隔
            //   // 如果其他位置已有间隔且在当前行之后， 则对应的rowNum加一
            //   this.reSetLarger(j + 1, i, 1)
            //   if (list.siesta && list.siesta > j)  list.siesta++
            //   if (list.exercise && list.exercise > j)  list.exercise++
            //   // 如果是 插入到已有午休时间或课间操处， 则删除原有数据
            //   if (list.siesta === j + 2) {
            //     list.siesta = ''
            //     list.detail.splice(j + 2, 1)
            //     list.exercise ? list.exercise-- : ''
            //   }
            //   if (list.exercise === j + 2) {
            //     list.exercise = ''
            //     list.detail.splice(j + 2, 1)
            //     list.siesta ? list.siesta-- : ''
            //   }
      },
      onfocus (index) {
        // 记录原有数据，用于删除
        this.formData.placeholder[index].oldSection = this.formData.placeholder[index].section
      },
      addPlaceholder (index) {
        // 如果不存在间隔， 添加, 并记录间隔所在行数
        let section = this.formData.placeholder[index].section
        let oldSection = this.formData.placeholder[index].oldSection
        let tempData = this.transferData()
        let columnNum = this.transColumnNum()
        if (oldSection === section) return // 输入框数据没有变化，不操作
        if (this.allData.section && this.allData.section.indexOf(+section) > -1) {
          this.$Message.warning('间隔不可重复添加');
          this.formData.placeholder[index].section = oldSection
          return
        }
        if (section.trim() !== '' && (columnNum < section || section < 1)) {
          this.$Message.warning('请输入有效课节数');
          this.formData.placeholder[index].section = oldSection
          return
        }
        if (oldSection !== section && oldSection !== '') {
          this.deletePlaceholder(+oldSection)
          // return
        }
        if (section === '') {
          return
        }
        // 记录当前含有间隔所在行数
        if (!this.allData.placeholder) this.$set(this.allData, 'placeholder', [])
        // 记录当前含有间隔所在课节数
        if (!this.allData.section) this.$set(this.allData, 'section', [])
        for (let i = 0 ; i < tempData.length; i++) {
          let list = this.transList(i)
          let currentRowNum = -1
          for (let j = 0; j < list.detail.length; j++) {
            if (list.detail[j].nodeNum === +section) {
                currentRowNum = j
            //   this.formData.placeholder[index].rowNum = j + 1
            //   this.allData.placeholder.push(j + 1) // 记录间隔所在行数
            //   this.allData.section.push(+section) // 记录间隔所在课节数
            //   list.detail.splice(j + 1, 0, this.formData.placeholder[index]) // 添加新的间隔
            //   // 如果其他位置已有间隔且在当前行之后， 则对应的rowNum加一
            //   this.reSetLarger(j + 1, i, 1)
            //   if (list.siesta && list.siesta > j)  list.siesta++
            //   if (list.exercise && list.exercise > j)  list.exercise++
            //   // 如果是 插入到已有午休时间或课间操处， 则删除原有数据
            //   if (list.siesta === j + 2) {
            //     list.siesta = ''
            //     list.detail.splice(j + 2, 1)
            //     list.exercise ? list.exercise-- : ''
            //   }
            //   if (list.exercise === j + 2) {
            //     list.exercise = ''
            //     list.detail.splice(j + 2, 1)
            //     list.siesta ? list.siesta-- : ''
            //   }
              break
            }
          }
          this.addOnePlacholder(list, currentRowNum, i, index)
        }
        console.log(tempData[0].detail)
      },
      reSetLarger (row, i, type) {
        this.allData.placeholder.forEach((item, index) => {
          let tempData = this.transList(i)
          if (type === 1 && item > row) {
            tempData.detail[item + 1].rowNum++
            this.allData.placeholder[index]++
          } 
          else if (type === -1 && item > row) {
            tempData.detail[item].rowNum--
            this.allData.placeholder[index]--
          }
        })
      }
    }
  }
</script>