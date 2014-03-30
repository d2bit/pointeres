/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('error', function(evt) {
            alert('Error! '+ evt);
        });
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
            // new FastClick(document.body);
            // var myScroll = new IScroll('#content');

            // document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

            
            // new IScroll('#content', { scrollY: false, scrollbars: false});

            alert(id + " 1");

            // x$.ready(function(){
                    alert('xui is ready');
                /*x$('#header').on('touchstart', function(evt) {
                    if (x$('#principal').hasClass('center')) {
                        console.log('click on header - muestra menu');
                        x$('#principal').removeClass('center').addClass('right');
                        x$('#menu').removeClass('left').addClass('center');
                    }
                    else {
                        console.log('click on header - oculta menu');
                        x$('#principal').removeClass('right').addClass('center');
                        x$('#menu').removeClass('center').addClass('left');
                    }
                });
            // });*/
            x$('#nav_principal > li').on('touchstart', function(evt) { 
                // console.log(this.innerText);
                alert(this.innerText);
            });
            document.getElementById('header').addEventListener('touchstart', function() {
                alert('click en el header');
            }, false);

            alert(id + ' 2');
    }
};
