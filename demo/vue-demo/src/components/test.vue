<template>
<!-- /* eslint-disable*/ -->
  <div>
    <!-- <Modal
      v-model="showDialog"
      title="设置打印样式"
      :width="1036"
      :class-name="'customer-modal'"
      :okText="'去打印'"
      @on-ok="toPrint"
      @on-cancel="cancel"> -->
      <div class="customer-dialog">
        <div class="left-set">
          <div class="part">
            <div class="title">节次类型：</div>
              <!-- <Radio-group v-model="formData.sectionType">
                <Radio class="two-col" :label="item.label" v-for="item in sectionList" :key="item.label + '_' +item.content">{{item.content}}</Radio>
              </Radio-group> -->
          </div>
          <div class="part">
            <div class="title mgT16">星期类型：</div>
            <!-- <Radio-group v-model="formData.weekDaysType">
              <Radio class="two-col" :label="item.label" v-for="item in weekList" :key="item.label + '_' +item.content">{{item.content}}</Radio>
            </Radio-group> -->
          </div>
          <div class="part">
            <div class="title mgT16">间隔：</div>
            <div v-for="(item, index) in formData.placeholder" class="mgT16" :key="item + '_' +index">
              <span class="section-order">{{index + 1}}.</span> 在第<Input class="section-input" style="width: 36px;" size="small" v-model="item.section" @on-focus="onfocus(index)" @on-blur="addPlaceholder(index)"></Input>节后添加间隔:
              <Input class="section-content" v-model="placeholderValue[index]" size="small" style="width:164px;" placeholder="请输入"></Input>
              <div class="customer-td" :class="{'height20': item.message || item.warning}">
                <div class="fl mgl error">{{item.message}}</div>
                <div class="fr mgr110 error">{{item.warning}}</div>
              </div>
            </div>
          </div>
          <div class="part">
            <div class="title mgT16">附注：</div>
            <div v-for="(item, index) in formData.annotations" :key="index + '_' + item">
              <!-- <Radio-group v-model="item.type">
                <Radio class="four-col" :label="ind" v-for="ind in ['none', 'left', 'center', 'right']" :key="ind + '_' + item">{{transAnnotations(index, ind)}}</Radio>
              </Radio-group> -->
              <Input v-model="item.value" style="width:337px;" size="small" placeholder="请输入"></Input>
              <div :class="{'height20': item.message}">
                <div class="fl error">{{item.message}}</div>
              </div>
            </div>
          </div>
        </div>
        <div id="printContent" class="right-schedule">
          <!-- <div class="title"></div> -->
          <component
           v-if="childComponent && hasData"
           :is="childComponent"
           :showFirst="showFirst"
           v-bind="allData"
           :sectionType="formData.sectionType"
           :annotations="formData.annotations"
           @hook:mounted="getMounted"></component>
          <!-- <div class="footer"></div> -->
          <!-- <AppNoContent v-else class="classNoData">{{'暂无课表数据'}}</AppNoContent> -->
        </div>
      </div>
    <!-- </Modal> -->
  </div>
</template>
<script>
/* eslint-disable*/
//   import { mapState } from 'vuex'
  export default {
    name: 'PrintPreview',
    props: ['showPrint', 'type'],
    data () {
      return {
        showDialog: false,
        childComponent: null,
        allData: {},
        showFirst: true,
        placeholderValue: ['', '', ''],
        formData: {
          weekDaysType: '0',
          sectionType: '0',
          placeholder: [
            {
              section: '',
              content: '',
              value: '',
              rowNum: -1,
              message: '12212',
              warning: '12212'
            },
            {
              section: '',
              content: '',
              value: '',
              rowNum: -1,
              message: '121221',
              warning: '12212121'

            },
            {
              section: '',
              content: '',
              value: '',
              rowNum: -1,
              message: '',
              warning: ''
            }
          ],
          annotations: [
            {
              type: 'none',
              content: '',
              value: '',
              message: '122121'
            },
            {
              type: 'none',
              content: '',
              value: '',
              message: '212121'
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
      'formData.annotations': {
        handler: function (val) {
          debugger
          console.log('...1111....')
          val.forEach((item, index) => {
            if (item.value.length > 20) {
                this.$set(this.formData.annotations, index, {
                    message: '最多输入20个字',
                    content: item.value.substring(0, 20),
                    value: item.value
                })
            }
            else {
                this.$set(this.formData.annotations, index, {
                    message: '',
                    content: item.value,
                    value: item.value
                })
            }
          })
        },
        deep: true
      },
      placeholderValue: function (val) {
        console.log(val)
      },
      'formData.placeholder': {
        handler: function (val) {
         console.log('dfjaldjlk')
          val.forEach(item => {
            if (item.value.length > 20) {
            //   this.$nextTick(function () {
                item.warning = '最多输入20个字'
                item.content = item.value.substring(0, 20)
            //   })
            }
            else {
              item.warning = ''
              item.content = item.value
            }
          })
        },
        deep: true
      },
      'formData.weekDaysType': function (val) {
        this.changeWeek(val)
      }
    },
    computed: {
    //   ...mapState(['printData']),
      hasData () {
        if (!this.allData.kbLists) return false
        let type = Object.prototype.toString.call(this.allData.kbLists)
        if (type === '[object Object]') {
          return Object.keys(this.allData.kbLists).length
        }
        else {
          return this.allData.kbLists.length
        }
      }
    },
    mounted () {
      let _this = this
      let type = _this.type
      if (type === 'myClass') type = 'class'
      if (type === 'myTeacher') type = 'teacher'
    //   import(`../pages/index/components/table/${type}ScheduleTable`).then(function (module) {
    //     _this.childComponent = module.default
    //   })
    },
    methods: {
      getMounted () {
        let config = window.sessionStorage.getItem('printConfig')
        if (config) {
          this.formData = JSON.parse(config)
          this.formData.placeholder.forEach((item, index) => {
            this.addPlaceholder(index)
          })
        }
      },
      transAnnotations (index, ind) {
        if (ind === 'none') return '不附注'
        let start = index ? '下' : '上'
        let end = ''
        if (ind === 'left') end = '左'
        if (ind === 'center') end = '中'
        if (ind === 'right') end = '右'
        return `${start}${end}`
      },
      transferData () {
        console.log(this.allData.kbLists)
        if (this.type === 'student') return this.allData.kbLists
        if (this.type === 'course') return this.allData.kbLists.course
        if (this.type === 'room') return this.allData.kbLists.classRoom
        if (this.type === 'class' || this.type === 'myClass') return this.allData.kbLists
        if (this.type === 'teacher' || this.type === 'myTeacher') return this.allData.kbLists.teachers
      },
      transColumnNum () {
        if (this.type === 'student') return this.transferData()[0].column
        if (this.type === 'course') return this.transferData()[0].detail.length
        if (this.type === 'room') return this.transferData()[0].detail.length
        if (this.type === 'class' || this.type === 'myClass') return this.transferData()[0].column
        if (this.type === 'teacher' || this.type === 'myTeacher') return this.transferData()[0].detail.length
      },
      transList (index) {
        let list = this.transferData()
        if (this.type === 'student') return list[index].clazz
        if (this.type === 'course') return list[index]
        if (this.type === 'room') return list[index]
        if (this.type === 'class' || this.type === 'myClass') return list[index].clazz
        if (this.type === 'teacher' || this.type === 'myTeacher') return list[index]
      },
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
      onfocus (index) {
        // 记录原有数据，用于删除
        this.formData.placeholder[index].oldSection = this.formData.placeholder[index].section
      },
      addOnePlacholder (list, rowNum, i, index, section) {
        // 如果 当前添加的间隔所在位置 原有午休, 原有行 替换为间隔信息
        this.formData.placeholder[index].rowNum = rowNum
        this.allData.placeholder.push(rowNum) // 记录间隔所在行数
        this.allData.section.push(+section)
        if (list.siesta === rowNum) {
          list.detail[rowNum] = this.formData.placeholder[index]
          list.siesta = ''
          return
        }
        if (list.exercise === rowNum) {
          list.detail[rowNum] = this.formData.placeholder[index]
          list.exercise = ''
          return
        }
        list.detail.splice(rowNum, 0, this.formData.placeholder[index]) // 添加新的间隔
        for (let i = rowNum + 1; i < list.detail.length; i++) {
          if (i === list.siesta) {
            list.siesta++
            i++
          }
          if (i === list.exercise) {
            list.exercise++
            i++
          }
          let placeholderIndex = this.allData.placeholder.indexOf(i)
          if (placeholderIndex > -1) {
            list.detail[i + 1].rowNum++
            this.allData.placeholder[placeholderIndex]++
            i++
          }
        }
      },
      addPlaceholder (index) {
        // 如果不存在间隔， 添加, 并记录间隔所在行数
        let section = this.formData.placeholder[index].section
        let oldSection = this.formData.placeholder[index].oldSection
        let tempData = this.transferData()
        let columnNum = this.transColumnNum()
        if (oldSection === section) return // 输入框数据没有变化，不操作
        if (this.allData.section && this.allData.section.indexOf(+section) > -1) {
        //   this.$Message.warning('间隔不可重复添加');
          this.formData.placeholder[index].section = oldSection
          this.formData.placeholder[index].message = '不能输入相同数值数字'
          return
        }
        if (/\./.test(this.formData.placeholder[index].section)) {
          this.formData.placeholder[index].message = '输入框内只支持输入整数'
          return
        }
        if (section.trim() !== '' && (columnNum < section || section < 1)) {
          this.formData.placeholder[index].message = '请输入有效课节数'
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
        this.formData.placeholder[index].message = ''
        // 记录当前含有间隔所在行数
        if (!this.allData.placeholder) this.$set(this.allData, 'placeholder', [])
        // 记录当前含有间隔所在课节数
        if (!this.allData.section) this.$set(this.allData, 'section', [])
        for (let i = 0 ; i < tempData.length; i++) {
          let list = this.transList(i)
          let currentRowNum = -1
          for (let j = 0; j < list.detail.length; j++) {
            if (list.detail[j].nodeNum === +section) {
              currentRowNum = j + 1
              break
            }
          }
          this.addOnePlacholder(list, currentRowNum, i, index, section)
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
      },
      changeWeek (type) {
        // teacher\myteacher  this.kblist
        // class myClass room
        if (this.type === 'teacher' || this.type === 'myYTeacher') {
          if (this.kbLists.weekdays) this.kbLists.weekdays = this.weekDays[type].splice(0, this.kbLists.weekdays.length)
          else this.kbLists.weekDays = this.weekDays[type].splice(0, this.kbLists.weekDays.length)
          return
        }
        let tempData = this.transferData()
        tempData.forEach(item => {
          if (item.weekdays) item.weekdays = this.weekDays[type].splice(0, item.weekdays.length)
          else item.weekDays = this.weekDays[type].splice(0, item.weekDays.length)
        })
      },
      toPrint () {
        const print = document.getElementById('printContent')
        this.$print(print)
        window.sessionStorage.setItem('printConfig', JSON.stringify(this.formData))
      },
      cancel () {}
    }
  }
</script>