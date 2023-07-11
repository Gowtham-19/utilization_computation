const express = require("express");
const fs = require("fs");
const { end } = require("pdfkit");
app=express()

/**
 * combinations tested for utilization
 * nsd case
 * running stopped nsd passed
 * running nsd stopped passed
 * running nsd passed
 * stopped nsd passed
 * nsd running stopped passed
 * nsd stopped running passed
 * complex case
 * running stopped nsd running
 * nsd running
 */

/**
 * 
 * Function to generate test data
 */
const generatedata = async function() {
    let start_time=new Date(new Date().setHours(15,0,0,0));
    let data=[];
    // for(let i=1;i<=360;i++){
    //     start_time=new Date(new Date(start_time.setSeconds(new Date(start_time).getSeconds()+10)))
    //     if(i>=1 && i<=100){
    //         data.push({
    //             start_time:new Date(start_time).toISOString().slice(0,-5)+"Z",
    //             status:"running"
    //         })
    //     }
    //     else if(i>100 && i<=200){
    //         data.push({
    //             start_time:new Date(start_time).toISOString().slice(0,-5)+"Z",
    //             status:"running"
    //         })
    //     }else if(i>200){
    //         data.push({
    //             start_time:new Date(start_time).toISOString().slice(0,-5)+"Z",
    //             status:"stopped"
    //         })
    //     }       
    // }
    data=[
        {
            "_id": "64ad3015c85a39aada4948f3",
            "status": "running",
            "vx": 4.912,
            "vy": 5.697,
            "vz": 5.899,
            "temperature": 39.268,
            "created_at": "2023-07-11T10:33:57.000Z"
        },
        {
            "_id": "64ad3031c85a39aada4949ab",
            "status": "running",
            "vx": 5.393,
            "vy": 5.153,
            "vz": 5.437,
            "temperature": 47.131,
            "created_at": "2023-07-11T10:34:25.000Z"
        },
        {
            "_id": "64ad3048c85a39aada494a54",
            "status": "running",
            "vx": 5.281,
            "vy": 5.43,
            "vz": 5.486,
            "temperature": 34.538,
            "created_at": "2023-07-11T10:34:48.000Z"
        },
        {
            "_id": "64ad30d7c85a39aada494dc5",
            "status": "running",
            "vx": 5.018,
            "vy": 5.007,
            "vz": 4.957,
            "temperature": 34.619,
            "created_at": "2023-07-11T10:37:11.000Z"
        },
        {
            "_id": "64ad30ebc85a39aada494e7f",
            "status": "running",
            "vx": 5.457,
            "vy": 5.807,
            "vz": 5.989,
            "temperature": 38.486,
            "created_at": "2023-07-11T10:37:31.000Z"
        },
        {
            "_id": "64ad30f0c85a39aada494eae",
            "status": "running",
            "vx": 4.945,
            "vy": 5.675,
            "vz": 4.264,
            "temperature": 40.033,
            "created_at": "2023-07-11T10:37:36.000Z"
        },
        {
            "_id": "64ad30fdc85a39aada494ef9",
            "status": "running",
            "vx": 5.737,
            "vy": 6.031,
            "vz": 5.812,
            "temperature": 40.589,
            "created_at": "2023-07-11T10:37:49.000Z"
        },
        {
            "_id": "64ad310cc85a39aada494f50",
            "status": "running",
            "vx": 4.955,
            "vy": 5.016,
            "vz": 5.463,
            "temperature": 35.296,
            "created_at": "2023-07-11T10:38:04.000Z"
        },
        {
            "_id": "64ad3125c85a39aada494fec",
            "status": "running",
            "vx": 5.094,
            "vy": 5.269,
            "vz": 6.784,
            "temperature": 34.627,
            "created_at": "2023-07-11T10:38:29.000Z"
        },
        {
            "_id": "64ad3132c85a39aada49503d",
            "status": "running",
            "vx": 5.218,
            "vy": 5.203,
            "vz": 4.624,
            "temperature": 36.351,
            "created_at": "2023-07-11T10:38:42.000Z"
        },
        {
            "_id": "64ad315ac85a39aada495101",
            "status": "running",
            "vx": 5.017,
            "vy": 5.463,
            "vz": 5.115,
            "temperature": 37.31,
            "created_at": "2023-07-11T10:39:22.000Z"
        },
        {
            "_id": "64ad316cc85a39aada495176",
            "status": "running",
            "vx": 4.94,
            "vy": 5.343,
            "vz": 6.35,
            "temperature": 34.119,
            "created_at": "2023-07-11T10:39:40.000Z"
        },
        {
            "_id": "64ad3180c85a39aada4951ed",
            "status": "running",
            "vx": 4.771,
            "vy": 5.659,
            "vz": 4.414,
            "temperature": 35.779,
            "created_at": "2023-07-11T10:40:00.000Z"
        },
        {
            "_id": "64ad318ec85a39aada49524a",
            "status": "running",
            "vx": 4.621,
            "vy": 5.775,
            "vz": 5.396,
            "temperature": 39.155,
            "created_at": "2023-07-11T10:40:14.000Z"
        },
        {
            "_id": "64ad319cc85a39aada495294",
            "status": "running",
            "vx": 5.056,
            "vy": 5.135,
            "vz": 5.502,
            "temperature": 35.247,
            "created_at": "2023-07-11T10:40:28.000Z"
        },
        {
            "_id": "64ad31a9c85a39aada4952f4",
            "status": "running",
            "vx": 5.111,
            "vy": 5.342,
            "vz": 6.093,
            "temperature": 38.389,
            "created_at": "2023-07-11T10:40:41.000Z"
        },
        {
            "_id": "64ad31b6c85a39aada495348",
            "status": "running",
            "vx": 4.444,
            "vy": 5.835,
            "vz": 4.159,
            "temperature": 38.26,
            "created_at": "2023-07-11T10:40:54.000Z"
        },
        {
            "_id": "64ad31c6c85a39aada495398",
            "status": "running",
            "vx": 4.97,
            "vy": 5.642,
            "vz": 5.512,
            "temperature": 42.571,
            "created_at": "2023-07-11T10:41:10.000Z"
        },
        {
            "_id": "64ad31d3c85a39aada4953ea",
            "status": "running",
            "vx": 5.265,
            "vy": 5.408,
            "vz": 6.257,
            "temperature": 35.634,
            "created_at": "2023-07-11T10:41:23.000Z"
        },
        {
            "_id": "64ad31e0c85a39aada495474",
            "status": "running",
            "vx": 5.286,
            "vy": 5.107,
            "vz": 5.503,
            "temperature": 35.819,
            "created_at": "2023-07-11T10:41:36.000Z"
        },
        {
            "_id": "64ad31f3c85a39aada495506",
            "status": "running",
            "vx": 5.694,
            "vy": 5.657,
            "vz": 5.085,
            "temperature": 37.761,
            "created_at": "2023-07-11T10:41:55.000Z"
        },
        {
            "_id": "64ad3205c85a39aada49557c",
            "status": "running",
            "vx": 4.681,
            "vy": 5.042,
            "vz": 5.638,
            "temperature": 37.39,
            "created_at": "2023-07-11T10:42:13.000Z"
        },
        {
            "_id": "64ad3218c85a39aada4955f7",
            "status": "running",
            "vx": 5.569,
            "vy": 5.564,
            "vz": 6.484,
            "temperature": 37.31,
            "created_at": "2023-07-11T10:42:32.000Z"
        },
        {
            "_id": "64ad3239c85a39aada4956b8",
            "status": "running",
            "vx": 5.615,
            "vy": 5.695,
            "vz": 5.652,
            "temperature": 36.714,
            "created_at": "2023-07-11T10:43:05.000Z"
        },
        {
            "_id": "64ad324ec85a39aada49571a",
            "status": "running",
            "vx": 5.286,
            "vy": 5.257,
            "vz": 5.408,
            "temperature": 37.64,
            "created_at": "2023-07-11T10:43:26.000Z"
        },
        {
            "_id": "64ad326bc85a39aada4957a1",
            "status": "running",
            "vx": 5.266,
            "vy": 5.351,
            "vz": 5.484,
            "temperature": 35.997,
            "created_at": "2023-07-11T10:43:55.000Z"
        },
        {
            "_id": "64ad3288c85a39aada495839",
            "status": "running",
            "vx": 5.302,
            "vy": 5.577,
            "vz": 4.275,
            "temperature": 41.258,
            "created_at": "2023-07-11T10:44:24.000Z"
        },
        {
            "_id": "64ad32eac85a39aada495a54",
            "status": "running",
            "vx": 4.99,
            "vy": 5.207,
            "vz": 5.533,
            "temperature": 36.931,
            "created_at": "2023-07-11T10:46:02.000Z"
        },
        {
            "_id": "64ad32fdc85a39aada495ab6",
            "status": "running",
            "vx": 4.537,
            "vy": 5.285,
            "vz": 6.31,
            "temperature": 37.608,
            "created_at": "2023-07-11T10:46:21.000Z"
        },
        {
            "_id": "64ad3303c85a39aada495ad2",
            "status": "running",
            "vx": 5.923,
            "vy": 5.446,
            "vz": 5.704,
            "temperature": 38.414,
            "created_at": "2023-07-11T10:46:27.000Z"
        },
        {
            "_id": "64ad3324c85a39aada495ba5",
            "status": "running",
            "vx": 4.702,
            "vy": 4.957,
            "vz": 5.466,
            "temperature": 36.963,
            "created_at": "2023-07-11T10:47:00.000Z"
        },
        {
            "_id": "64ad335dc85a39aada495ce7",
            "status": "running",
            "vx": 4.729,
            "vy": 5.038,
            "vz": 5.316,
            "temperature": 36.214,
            "created_at": "2023-07-11T10:47:57.000Z"
        },
        {
            "_id": "64ad3379c85a39aada495d70",
            "status": "running",
            "vx": 5.017,
            "vy": 5.57,
            "vz": 6.089,
            "temperature": 37.382,
            "created_at": "2023-07-11T10:48:25.000Z"
        },
        {
            "_id": "64ad3393c85a39aada495e03",
            "status": "running",
            "vx": 5.059,
            "vy": 5.672,
            "vz": 6.612,
            "temperature": 36.029,
            "created_at": "2023-07-11T10:48:51.000Z"
        },
        {
            "_id": "64ad33e4c85a39aada495fbe",
            "status": "running",
            "vx": 5.794,
            "vy": 5.985,
            "vz": 5.911,
            "temperature": 39.324,
            "created_at": "2023-07-11T10:50:12.000Z"
        },
        {
            "_id": "64ad341fc85a39aada496116",
            "status": "running",
            "vx": 4.826,
            "vy": 5.632,
            "vz": 4.667,
            "temperature": 39.55,
            "created_at": "2023-07-11T10:51:11.000Z"
        },
        {
            "_id": "64ad3455c85a39aada49627b",
            "status": "running",
            "vx": 4.804,
            "vy": 5.48,
            "vz": 5.236,
            "temperature": 34.16,
            "created_at": "2023-07-11T10:52:05.000Z"
        },
        {
            "_id": "64ad3460c85a39aada4962e3",
            "status": "running",
            "vx": 5.006,
            "vy": 5.479,
            "vz": 5.164,
            "temperature": 35.698,
            "created_at": "2023-07-11T10:52:16.000Z"
        },
        {
            "_id": "64ad3473c85a39aada496351",
            "status": "running",
            "vx": 4.963,
            "vy": 5.186,
            "vz": 6.275,
            "temperature": 36.037,
            "created_at": "2023-07-11T10:52:35.000Z"
        },
        {
            "_id": "64ad347fc85a39aada4963a8",
            "status": "running",
            "vx": 5.457,
            "vy": 5.331,
            "vz": 5.447,
            "temperature": 36.23,
            "created_at": "2023-07-11T10:52:47.000Z"
        },
        {
            "_id": "64ad34b1c85a39aada4964f9",
            "status": "running",
            "vx": 5.177,
            "vy": 5.491,
            "vz": 6.076,
            "temperature": 38.76,
            "created_at": "2023-07-11T10:53:37.000Z"
        },
        {
            "_id": "64ad34ccc85a39aada4965bb",
            "status": "running",
            "vx": 5.419,
            "vy": 5.31,
            "vz": 5.371,
            "temperature": 36.778,
            "created_at": "2023-07-11T10:54:04.000Z"
        },
        {
            "_id": "64ad34fdc85a39aada496726",
            "status": "running",
            "vx": 5.283,
            "vy": 5.66,
            "vz": 5.921,
            "temperature": 38.051,
            "created_at": "2023-07-11T10:54:53.000Z"
        },
        {
            "_id": "64ad352fc85a39aada496823",
            "status": "running",
            "vx": 5.175,
            "vy": 5.698,
            "vz": 6.004,
            "temperature": 36.528,
            "created_at": "2023-07-11T10:55:43.000Z"
        },
        {
            "_id": "64ad3747c85a39aada497429",
            "status": "running",
            "vx": 5.297,
            "vy": 5.272,
            "vz": 6.192,
            "temperature": 42.104,
            "created_at": "2023-07-11T11:04:39.000Z"
        },
        {
            "_id": "64ad3754c85a39aada49746f",
            "status": "running",
            "vx": 5.317,
            "vy": 5.398,
            "vz": 5.035,
            "temperature": 40.275,
            "created_at": "2023-07-11T11:04:52.000Z"
        },
        {
            "_id": "64ad3771c85a39aada4974fd",
            "status": "running",
            "vx": 5.032,
            "vy": 5.548,
            "vz": 6.083,
            "temperature": 35.118,
            "created_at": "2023-07-11T11:05:21.000Z"
        },
        {
            "_id": "64ad378bc85a39aada497583",
            "status": "running",
            "vx": 4.993,
            "vy": 5.645,
            "vz": 6.21,
            "temperature": 42.74,
            "created_at": "2023-07-11T11:05:47.000Z"
        },
        {
            "_id": "64ad37d4c85a39aada497757",
            "status": "running",
            "vx": 5.33,
            "vy": 5.716,
            "vz": 5.881,
            "temperature": 36.109,
            "created_at": "2023-07-11T11:07:00.000Z"
        },
        {
            "_id": "64ad3802c85a39aada49786e",
            "status": "running",
            "vx": 4.863,
            "vy": 5.426,
            "vz": 5.612,
            "temperature": 43.562,
            "created_at": "2023-07-11T11:07:46.000Z"
        },
        {
            "_id": "64ad3828c85a39aada49794a",
            "status": "running",
            "vx": 4.833,
            "vy": 4.907,
            "vz": 5.886,
            "temperature": 34.127,
            "created_at": "2023-07-11T11:08:24.000Z"
        },
        {
            "_id": "64ad382dc85a39aada497976",
            "status": "running",
            "vx": 5.241,
            "vy": 5.261,
            "vz": 5.913,
            "temperature": 35.739,
            "created_at": "2023-07-11T11:08:29.000Z"
        },
        {
            "_id": "64ad3845c85a39aada4979f0",
            "status": "running",
            "vx": 5.053,
            "vy": 5.261,
            "vz": 5.467,
            "temperature": 36.585,
            "created_at": "2023-07-11T11:08:53.000Z"
        },
        {
            "_id": "64ad387bc85a39aada497b0b",
            "status": "running",
            "vx": 5.525,
            "vy": 6.174,
            "vz": 6.037,
            "temperature": 40.25,
            "created_at": "2023-07-11T11:09:47.000Z"
        },
        {
            "_id": "64ad38bfc85a39aada497c59",
            "status": "running",
            "vx": 5.009,
            "vy": 5.621,
            "vz": 5.13,
            "temperature": 39.767,
            "created_at": "2023-07-11T11:10:55.000Z"
        },
        {
            "_id": "64ad38f7c85a39aada497d9c",
            "status": "running",
            "vx": 5.23,
            "vy": 5.436,
            "vz": 4.5,
            "temperature": 39.896,
            "created_at": "2023-07-11T11:11:51.000Z"
        },
        {
            "_id": "64ad390ec85a39aada497e41",
            "status": "running",
            "vx": 5.039,
            "vy": 5.874,
            "vz": 6.032,
            "temperature": 38.397,
            "created_at": "2023-07-11T11:12:14.000Z"
        },
        {
            "_id": "64ad3941c85a39aada497f3c",
            "status": "running",
            "vx": 5.064,
            "vy": 5.532,
            "vz": 5.35,
            "temperature": 36.706,
            "created_at": "2023-07-11T11:13:05.000Z"
        },
        {
            "_id": "64ad3948c85a39aada497f6d",
            "status": "running",
            "vx": 5.053,
            "vy": 5.617,
            "vz": 5.241,
            "temperature": 37.85,
            "created_at": "2023-07-11T11:13:12.000Z"
        },
        {
            "_id": "64ad3ac0c85a39aada498767",
            "status": "running",
            "vx": 5.274,
            "vy": 5.393,
            "vz": 5.447,
            "temperature": 35.417,
            "created_at": "2023-07-11T11:19:28.000Z"
        },
        {
            "_id": "64ad3ad1c85a39aada4987c9",
            "status": "running",
            "vx": 4.928,
            "vy": 4.996,
            "vz": 5.716,
            "temperature": 38.317,
            "created_at": "2023-07-11T11:19:45.000Z"
        },
        {
            "_id": "64ad3af1c85a39aada49888c",
            "status": "running",
            "vx": 5.089,
            "vy": 5.643,
            "vz": 6.376,
            "temperature": 41.507,
            "created_at": "2023-07-11T11:20:17.000Z"
        },
        {
            "_id": "64ad3b10c85a39aada49892c",
            "status": "running",
            "vx": 5.18,
            "vy": 5.193,
            "vz": 4.97,
            "temperature": 35.457,
            "created_at": "2023-07-11T11:20:48.000Z"
        },
        {
            "_id": "64ad3b30c85a39aada4989cc",
            "status": "running",
            "vx": 5.029,
            "vy": 5.036,
            "vz": 5.739,
            "temperature": 36.512,
            "created_at": "2023-07-11T11:21:20.000Z"
        },
        {
            "_id": "64ad3b40c85a39aada498a4d",
            "status": "running",
            "vx": 5.044,
            "vy": 5.739,
            "vz": 6.581,
            "temperature": 35.876,
            "created_at": "2023-07-11T11:21:36.000Z"
        },
        {
            "_id": "64ad3b65c85a39aada498b41",
            "status": "running",
            "vx": 5.12,
            "vy": 4.921,
            "vz": 4.956,
            "temperature": 34.2,
            "created_at": "2023-07-11T11:22:13.000Z"
        },
        {
            "_id": "64ad3b6ac85a39aada498b5d",
            "status": "running",
            "vx": 5.264,
            "vy": 5.059,
            "vz": 5.416,
            "temperature": 35.312,
            "created_at": "2023-07-11T11:22:18.000Z"
        },
        {
            "_id": "64ad3ba2c85a39aada498c74",
            "status": "running",
            "vx": 5.036,
            "vy": 5.316,
            "vz": 6.125,
            "temperature": 36.673,
            "created_at": "2023-07-11T11:23:14.000Z"
        },
        {
            "_id": "64ad3bb5c85a39aada498cd6",
            "status": "running",
            "vx": 5.233,
            "vy": 5.154,
            "vz": 5.409,
            "temperature": 36.125,
            "created_at": "2023-07-11T11:23:33.000Z"
        },
        {
            "_id": "64ad3be8c85a39aada498dd9",
            "status": "running",
            "vx": 4.97,
            "vy": 5.133,
            "vz": 5.64,
            "temperature": 38.003,
            "created_at": "2023-07-11T11:24:23.000Z"
        },
        {
            "_id": "64ad3bf8c85a39aada498e36",
            "status": "running",
            "vx": 5.63,
            "vy": 5.381,
            "vz": 5.304,
            "temperature": 35.707,
            "created_at": "2023-07-11T11:24:40.000Z"
        },
        {
            "_id": "64ad3c2cc85a39aada498f47",
            "status": "running",
            "vx": 5.164,
            "vy": 5.027,
            "vz": 5.793,
            "temperature": 38.688,
            "created_at": "2023-07-11T11:25:32.000Z"
        },
        {
            "_id": "64ad3c47c85a39aada498ffc",
            "status": "running",
            "vx": 5.221,
            "vy": 5.448,
            "vz": 6.467,
            "temperature": 38.059,
            "created_at": "2023-07-11T11:25:58.000Z"
        },
        {
            "_id": "64ad3c4fc85a39aada499035",
            "status": "running",
            "vx": 5.42,
            "vy": 5.856,
            "vz": 5.191,
            "temperature": 35.28,
            "created_at": "2023-07-11T11:26:07.000Z"
        },
        {
            "_id": "64ad3c65c85a39aada4990b0",
            "status": "running",
            "vx": 4.976,
            "vy": 5.344,
            "vz": 5.054,
            "temperature": 40.951,
            "created_at": "2023-07-11T11:26:29.000Z"
        },
        {
            "_id": "64ad3c7bc85a39aada499144",
            "status": "running",
            "vx": 5.317,
            "vy": 5.51,
            "vz": 5.431,
            "temperature": 35.771,
            "created_at": "2023-07-11T11:26:51.000Z"
        },
        {
            "_id": "64ad3c88c85a39aada49918b",
            "status": "running",
            "vx": 5.136,
            "vy": 5.254,
            "vz": 6.02,
            "temperature": 38.091,
            "created_at": "2023-07-11T11:27:04.000Z"
        },
        {
            "_id": "64ad3cd6c85a39aada499320",
            "status": "running",
            "vx": 5.078,
            "vy": 5.05,
            "vz": 5.283,
            "temperature": 39.131,
            "created_at": "2023-07-11T11:28:22.000Z"
        },
        {
            "_id": "64ad3cf3c85a39aada4993d0",
            "status": "running",
            "vx": 5.56,
            "vy": 5.603,
            "vz": 5.32,
            "temperature": 38.454,
            "created_at": "2023-07-11T11:28:51.000Z"
        }
    ]
    return data
}

/**
 * Function to compute utilization on data
 * @param {*} data db date
 * @returns 
 */
const computeData =async (data)=> {
    //positive case    
    console.log("data of computed",data.length)
    if(data.length>0){
        let start_time=new Date("2023-07-11T10:30:00Z");
        let end_time=new Date("2023-07-11T11:30:00Z");
        let data_end_time_in_ms=new Date(data[data.length-1]["created_at"]).getTime();
        let final_data=[];
        let data_start_time=start_time.toISOString().slice(0,-5)+"Z";
        let end_time_in_ms=new Date(end_time).getTime();
        let data_start_pos=-1;
        let intial_packet_difference=(new Date(data[0]["created_at"]).getTime()-new Date(data_start_time).getTime())/1000;
        const nsd_config=20;
        // nsd condtion check
        if(intial_packet_difference>=nsd_config){
            let seconds=(new Date(data[0]["created_at"]).getTime()-new Date(data_start_time).getTime())/1000
            seconds=seconds.toFixed(0);
            final_data.push({
                status:"nsd",
                start_time:data_start_time,
                end_time:data[0]["created_at"],
                duration:toHoursAndMinutes(Number(seconds))
            })
            data_start_time=data[0]["created_at"];
            data_start_pos=0;
        }
        let status_flags={
            running:data.findIndex((ele)=> ele["status"] == "running"),
            stopped:data.findIndex((ele)=> ele["status"] == "stopped"),
        }
        console.log("data of status flags",status_flags)
        let compute_data=[]
        if(status_flags["running"] != -1 && status_flags["stopped"] != -1){
            await computeStatusData();
        }
        else if(status_flags["running"] != -1 || status_flags["stopped"] != -1){
            compute_data = await singleStatusData(data,data_start_time,nsd_config,end_time)
        }
        // proccesing data points
        final_data=final_data.concat(compute_data)
        return final_data
    }else{
        return [{
            status:"nsd",
            start_time:"2023-05-04T9:30:00Z",
            end_time:"2023-05-04T10:30:00Z",
        }]
    }
}

const singlePointData = async () => {
    try {
        
    } catch (error) {
        
    }
}

const singleStatusData = async (data,data_start_time,nsd_config,end_time) => {
    try {
        let compute_data=[];
        let seconds=0;
        for(let i=0;i<data.length;i++){
            if(i != data.length-1){
                let difference=Number(((new Date(data[i+1]['created_at']).getTime()-new Date(data[i]['created_at']).getTime())/1000).toFixed(2));
                if(difference>=nsd_config){
                    let start_time=data[i]["created_at"];
                    let end_time=new Date(new Date(start_time).setSeconds(new Date(start_time).getSeconds()+10));
                    seconds=Number(((new Date(end_time).getTime()-new Date(data_start_time).getTime())/1000).toFixed(2))
                    end_time=end_time.toISOString().slice(0,-5)+"Z";
                    compute_data.push({
                        status:data[i]["status"],
                        start_time:data[i]['created_at'],
                        end_time:end_time,
                        duration:toHoursAndMinutes(Number(seconds))
                    })
                    seconds=Number(((new Date(data[i+1]["created_at"]).getTime()-new Date(end_time).getTime())/1000).toFixed(2))
                    compute_data.push({
                        status:'nsd',
                        start_time:end_time,
                        end_time:data[i+1]["created_at"],
                        duration:toHoursAndMinutes(Number(seconds))
                    })
                    data_start_time=data[i+1]["created_at"]
                }
            }else{
                let difference =Number(((new Date(data['created_at']).getTime() - new Date(compute_data[compute_data.length-1]["end_time"]).getTime())/1000).toFixed(2));
                if(difference>=nsd_config){
                    seconds=Number(((new Date(data[i]["created_at"]).getTime()-new Date(data_start_time).getTime())/1000).toFixed(2));
                    let end_time=new Date(new Date(start_time).setSeconds(new Date(start_time).getSeconds()+10));
                    compute_data.push({
                        status:data[i]["status"],
                        start_time:data_start_time,
                        end_time:data[i]["created_at"],
                        duration:toHoursAndMinutes(Number(seconds))
                    })
                    seconds=Number(((new Date(end_time).getTime()-new Date(data[i]['created_at']).getTime())/1000).toFixed(2))
                    compute_data.push({
                        status:'nsd',
                        start_time:data[i]["created_at"],
                        end_time:end_time,
                        duration:toHoursAndMinutes(Number(seconds))
                    });
                    data_start_time=end_time;
                }else{
                    seconds=Number(((new Date(data[i]["created_at"]).getTime()-new Date(data_start_time).getTime())/1000).toFixed(2))
                    compute_data.push({
                        status:data[i]["status"],
                        start_time:data_start_time,
                        end_time:data[i]["created_at"],
                        duration:toHoursAndMinutes(Number(seconds))
                    })
                }
            }
        }
        let difference =Number(((new Date(end_time).getTime() - new Date(compute_data[compute_data.length-1]["end_time"]).getTime())/1000).toFixed(2));
        if(difference>=nsd_config){
            seconds=Number(((new Date(end_time).getTime()-new Date(compute_data[compute_data.length-1]["end_time"]).getTime())/1000).toFixed(2))
            compute_data.push({
                status:'nsd',
                start_time:compute_data[compute_data.length-1]["end_time"],
                end_time:end_time,
                duration:toHoursAndMinutes(Number(seconds))
            })
        }
        return compute_data
    } catch (error) {
        console.log("error in single status compute",error)
    }
}

const computeStatusData = async () => {
    try {
        
    } catch (error) {
        
    }
}

function toHoursAndMinutes(totalSeconds) {
    const totalMinutes = Math.floor(totalSeconds / 60);
  
    const seconds = totalSeconds % 60;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
  
    return { h: hours, m: minutes, s: seconds };
  }
  
app.get("/test",async(req,res)=> {
    // let data = await generatedata();
    fs.readFile("./data-util.json",async function(err,data){
        console.log("errorrr",err)
        let file_data=JSON.parse(data.toString());
        let utilization=await computeData(file_data)
        res.status(200).json({
            data:utilization
        })
    })
})

app.listen(7000,()=> {
    console.log("server listeneing on 7000")
})
