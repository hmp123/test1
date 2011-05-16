
var wrongDateFormatMessage='Please enter datetime in correct format: \n DD/MM/YY HH:MM or DD/MM/YY';
var InValidDateMessage='Invalid date!';
var PastDateMessage = 'Past date is not allowed!';
var wrongTimeFormatMessage = 'Please enter time in correct format: HH:MM (24 hours format) \n For example 18:30';
var DateCompareMessage = 'End-date should be greater than Start-date';

function ValidateDate(TextBox,PastAllowed)
{    
    var DateText,TimeText;
    var DateTimeText=$(TextBox).val();
    
    DateTimeText=DateTimeText.split(' ');
    DateText=DateTimeText[0];
    TimeText=DateTimeText[1];
    
    if (DateText=="" && TimeText==undefined)
        return true;
    else if (DateText!="" && TimeText==undefined)
    {
        if (!DateText.match(/^[0-3][0-9]\/[0-1][0-9]\/[0-9][0-9]$/)){
            alert(wrongDateFormatMessage);
            return clearDate(TextBox);
        }
        else
            //do date validation            
            IsValidDate(TextBox,DateText,PastAllowed);              
    }    
    else if (DateText!="" && TimeText!=undefined)
    {
        if (DateText.match(/^[0-3][0-9]\/[0-1][0-9]\/[0-9][0-9]$/) && TimeText.match(/^[0-2][0-9]\:[0-5][0-9]$/))
            //do date validation            
            IsValidDate(TextBox,DateText,PastAllowed);                       
        else{
            alert(wrongDateFormatMessage);
            return clearDate(TextBox);    
        } 
    }
    else
    {
        alert(wrongDateFormatMessage);
        return clearDate(TextBox); 
    }
}

function clearDate(TextBox)
{
    $(TextBox).val('');
    TextBox.focus();
    return false;
}

function IsValidDate(TextBox,date,PastAllowed)
{   
    date=date.split('/');
    d=new Date(date[2],date[1]-1,date[0]);
    
    if (1*date[0]==d.getDate() && 1*date[1]==(d.getMonth()+1) && 1*date[2]==d.getYear())       
    {
        //check for past dates
        if (!PastAllowed){             
            if (IsPastDate(d)){
                alert(PastDateMessage);
                return clearDate(TextBox);          
            }    
            else 
                return true;
        }
        else
            return true;
    }
    else{
        alert(InValidDateMessage);
        return clearDate(TextBox);
    }
        
}
function IsPastDate(date)
{
       var today = new Date();
          
        if ((date.getFullYear()+100) < today.getYear()) {
            return true;
        }
        else if ((date.getFullYear()+100) == today.getYear()){   
            if (date.getMonth() < today.getMonth())  {   
                return true;   
            }  
            else if (date.getMonth() == today.getMonth())
            {
                if (date.getDate() < today.getDate())  {
                    return true; 
                } 
            }              
        }  
      return false;
  }
  function showDate(ctlID) {
      var dateformat = "%d/%m/%y";
      showCalendar(ctlID, dateformat, false, true);

  }
  function showTime(ctlID) {
      var dateformat = "%H:%M";
      showCalendar(ctlID, dateformat, true, true);

  }
  function showDateTime(ctlID) {
      var dateformat = "%d/%m/%y %H:%M";
      showCalendar(ctlID, dateformat, true, true);
  }
  function showDateEnableAll(ctlID) {
      var dateformat = "%d/%m/%y";
      showCalendar(ctlID, dateformat, false, false);
  }
  function showDateTimeEnableAll(ctlID) {
      var dateformat = "%d/%m/%y %H:%M";
      showCalendar(ctlID, dateformat, true, false);

  }
  function ValidateTime(TextBox) {
      var TimeText = $(TextBox).val();
      if (TimeText != undefined && TimeText != '') {
          if (TimeText.match(/^[0-2][0-9]\:[0-5][0-9]$/))
              return true;
          else {
              alert(wrongTimeFormatMessage);
              return clearDate(TextBox);
          }
      }

  }
  function NotAllowedGreaterThan(txtToDate, txtFromDate) {    
      var startDate = getDateObject($(txtToDate).val(), "/");
      var endDate = getDateObject($("." + txtFromDate).val(), "/");

      if ($(txtToDate).val() == '')
          return;

      if (startDate.getTime() <= endDate.getTime()) {
          clearDate(txtToDate);
          alert(DateCompareMessage);
      }

  }
  function isNumber(TextBox) {
      var str = $(TextBox).val();
      isPrice = /^\d+\.\d{2}$/;
      if ((str != '') && (isPrice.test(str) == false)) {
          alert('Enter the value in correct format, For example 120.50');
          clearTextBox(TextBox);
      }

  }
  function clearTextBox(TextBox) {
      $(TextBox).val('');
      $(TextBox)[0].focus();
      return false;
  }
  function getDateObject(dateString, dateSeperator) {
      //This function return a date object after accepting 
      //a date string ans dateseparator as arguments
      var curValue = dateString;
      var sepChar = dateSeperator;
      var curPos = 0;
      var cDate, cMonth, cYear, cTimeHH = 0, cTimeMM = 0;

      //extract day portion
      curPos = dateString.indexOf(sepChar);
      cDate = dateString.substring(0, curPos);

      //extract month portion 
      endPos = dateString.indexOf(sepChar, curPos + 1);
      cMonth = dateString.substring(curPos + 1, endPos);

      //extract year portion 
      curPos = endPos;
      endPos = curPos + 3;
      cYear = curValue.substring(curPos + 1, endPos);

      //extract time     
      if (dateString.indexOf(':') != '-1') {
          cTimeHH = dateString.substring(dateString.indexOf(' '), dateString.indexOf(':'));
          cTimeMM = dateString.substring(dateString.indexOf(':') + 1);
      }

      //Create Date Object
      dtObject = new Date(cYear, cMonth, cDate, cTimeHH, cTimeMM);
      return dtObject;
  }
  function css_browser_selector(u)
  { var ua = u.toLowerCase(), is = function(t) { return ua.indexOf(t) > -1; }, g = 'gecko', w = 'webkit', s = 'safari', h = document.getElementsByTagName('html')[0], b = [(!(/opera|webtv/i.test(ua)) && /msie\s(\d)/.test(ua)) ? ('ie ie' + RegExp.$1) : is('firefox/2') ? g + ' ff2' : is('firefox/3') ? g + ' ff3' : is('gecko/') ? g : /opera(\s|\/)(\d+)/.test(ua) ? 'opera opera' + RegExp.$2 : is('konqueror') ? 'konqueror' : is('chrome') ? w + ' chrome' : is('applewebkit/') ? w + ' ' + s + (/version\/(\d+)/.test(ua) ? ' ' + s + RegExp.$1 : '') : is('mozilla/') ? g : '', is('j2me') ? 'mobile' : is('iphone') ? 'iphone' : is('ipod') ? 'ipod' : is('mac') ? 'mac' : is('darwin') ? 'mac' : is('webtv') ? 'webtv' : is('win') ? 'win' : is('freebsd') ? 'freebsd' : (is('x11') || is('linux')) ? 'linux' : '', 'js']; c = b.join(' '); h.className += ' ' + c; return c; }; css_browser_selector(navigator.userAgent);

  function ClearDivControls(Div) {
      Div.find("input").val('');
      Div.find("select").attr('selectedIndex', 0);

  }
  function refreshAlert(fn) {
      //Fetch Alerts
      $.ajax({
          type: "POST",
          url: fn,
          data: "{}",
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: function(msg) {

              //Show Alerts
              if (msg.d != "") {

                  var AlertXML = text2xml(msg.d);
                  $(".imgAlert").effect("pulsate", { times: 3 });

                  $(AlertXML).find("Alert").each(function() {
                      $(".divAlert").find("div:first").prepend("<div id=" + $(this).find('ENTITY_ID').text() + " class='Alert AlertBold' onclick='Alert_click(this)'>" + $(this).find('MESSAGE').text() + "</div>" +
                                                                 "<img alt='' src='../../Images/horizontal_line.png' width='99%' height='1px;'/>");

                  });
              }
              else if ($(".divAlert").find(".AlertBold").length > 0) {
                  $(".imgAlert").effect("pulsate", { times: 0 });
              }
          }

      });

  }

  // CONVERT TEXT TO XML DOM
  function text2xml(s) {
      var x, ie = /msie/i.test(navigator.userAgent);

      try {
          var p = ie ? new ActiveXObject("Microsoft.XMLDOM") : new DOMParser();
          p.async = false;
      } catch (e)
     { alert("XML Parser could not be instantiated") };

      try {
          if (ie) x = p.loadXML(s) ? p : false;
          else x = p.parseFromString(s, "text/xml");
      } catch (e)
     { alert("Error parsing XML string") };
      return x;
  };

  //JQUERY BASIC FUNCTIONS

  function PageMethod(fn, paramArray, successFn, errorFn, blnasync) {
      var pagePath = window.location.pathname;
      //Create list of parameters in the form:    
      var paramList = '';
      if (paramArray.length > 0) {
          for (var i = 0; i < paramArray.length; i += 2) {
              if (paramList.length > 0) paramList += ',';
              paramList += "'" + paramArray[i] + "':'" + paramArray[i + 1].replace(/'/g, "`").replace(/&gt;/g, ">").replace(/&lt;/g, "<") + "'";
          }
      }
      paramList = '{' + paramList + '}';
      //Call the page method   
      $.ajax({
          type: "POST",
          url: pagePath.substring(pagePath.lastIndexOf("/") + 1) + "/" + fn,
          contentType: "application/json; charset=utf-8",
          data: paramList,
          async:blnasync,
          dataType: "json",
          success: successFn,
          error: errorFn
      });
  } 


  function FillXMLdataInDiv(Div, XMLNodes) {
      var tempXML;
      //Fill XML in controls
      XMLNodes.each(function() {
          selectedNodeName = $(this)[0].nodeName;
          if (selectedNodeName.indexOf("_XML") != "-1") {
              FillXMLdataInDiv(Div, $(text2xml($(this).text())).find("ROOT").children());
              return;
          }
          var _control = $(ControlsDataXML).find(selectedNodeName).attr('control'); // extract control-name from template xml 

          var control = Div.find("." + _control); //find control from Div        

          if (control.length > 0) {

              if (control[0].type == 'radio' || control[0].type == 'checkbox') {
                  control.parent().find("input[@value='" + $(this).text() + "']").attr("defaultChecked", "checked");
                  control.parent().find("iput[@value='" + $(this).text() + "']").attr("checked", "checked");

              }
              else if ($(control).hasClass("hdnXML")) {
                  tempXML = '';
                  $(this).children().each(function() {
                      if ($(this)[0].xml != undefined) {
                          tempXML = tempXML + $(this)[0].xml;
                      }
                      else {
                          tempXML = tempXML + (new XMLSerializer()).serializeToString($(this)[0])
                      }
                  });
                  control.val(tempXML);
              }
              else {
                  (control[0].nodeName == 'INPUT' || control[0].nodeName == 'SELECT' || control[0].nodeName == 'TEXTAREA') ? control.val($(this).text()) : control.text($(this).text()); //Check whether it's a textbox/li 
              }
          }
      });             //close each element  


  }


  function ClearDivData(Div) {
      Div.find("input,select").not("input:radio").not("input:checkbox").val('');
      Div.find("input").removeAttr("defaultChecked"); //clear all radio button selections
      Div.find("li,textarea").text('');
      Div.find("textarea").val('');

      Div.find(".tblDynamic").find('tr').remove();
  }

  function BindDropDown(DropDown, XMLNodes, valueField, TextField) {
      DropDown.children().remove();
      //Fill XML in dropdown 

      XMLNodes.each(function() {
          DropDown.append('<option value="' + $(this).find(valueField).text() + '">' + $(this).find(TextField).text() + '</option>');
      });
  }


  function clearXMLNodes(XML) {
      $(XML).find('ROOT').children().each(function() {
          $(this).text('');
      })
      return XML;
  }


  function CreateInsertXML(Div, ControlsDataXML) {
      var NodeValue;
      clearXMLNodes(ControlsDataXML);
      //create insert xml         
      $(ControlsDataXML).find('ROOT').children().each(function() {
          var _control = $(this).attr('control'); // extract control-name from template xml          
          var control = Div.find("." + _control); //find control from Div    


          if (control.length > 0) {
              if (control[0].type == 'radio' || control[0].type == 'checkbox') {
                  $(this).text(control.parent().find("input:checked").val());
              }
              else {
                  $(this).text((control[0].nodeName == 'INPUT' || control[0].nodeName == 'SELECT' || control[0].nodeName == 'TEXTAREA') ? control.val() : control.text()); //Check whether it's a textbox/li                    
              }

          }
          else {
              $(this).text('');
          }
      }); //close each element

      return (ControlsDataXML.xml == undefined ? (new XMLSerializer()).serializeToString(ControlsDataXML) : ControlsDataXML.xml);
  }
