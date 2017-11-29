import { Injectable } from '@angular/core';
import { CommonService } from 'services/common.service'
@Injectable()

export interface ProcessInterface {
  callee: any,
  timeStamp: Number,
  renderFunc: Function,
  completeFunc?: Function,
  totalLoops: Number,  // 0=endless
  internal: Number,
  indexInterval?: Number,
  indexLoops?: Number,
  complete: boolean
}

export class DeviceTimerService {
  static requestAnimationFrame: Function;
  static cancelAnimationFrame: Function;
  static animationFrame;
  static processes = {};

  static init() {
    if (DeviceTimerService.requestAnimationFrame) {
      return;
    }

    let w = (<any>window);

    DeviceTimerService.requestAnimationFrame = w.requestAnimationFrame ||
      w.webkitRequestAnimationFrame ||
      w.mozRequestAnimationFrame ||
      w.oRequestAnimationFrame ||
      w.msRequestAnimationFrame;

    DeviceTimerService.cancelAnimationFrame = w.cancelAnimationFrame ||
      w.webkitCancelRequestAnimationFrame ||
      w.webkitCancelAnimationFrame ||
      w.mozCancelRequestAnimationFrame || w.mozCancelAnimationFrame ||
      w.oCancelRequestAnimationFrame || w.oCancelAnimationFrame ||
      w.msCancelRequestAnimationFrame || w.msCancelAnimationFrame;

    DeviceTimerService.startDeviceTimer();
  }

  private static deviceTimer() {
    let processKeys = Object.keys(DeviceTimerService.processes);

    processKeys.forEach((key) => {
      let process = DeviceTimerService.processes[key];
      if (++process.indexInterval < process.interval) {
        if (!process.TotalLoops || ++process.indexLoops < process.TotalLoops) {
          process.renderFunc.apply(process.callee);
        } else {
          // this process id done, remove from the queue
          delete DeviceTimerService.processes[key];
          if (process.completeFunc) {
            process.completeFunc.apply(process.callee);
          }
        }
      } else {
        process.indexInterval = 0;
      }
    });


    // continue looping
    DeviceTimerService.animationFrame = DeviceTimerService.requestAnimationFrame(DeviceTimerService.deviceTimer);
  }

  private static unregister(timeStamp) {
    delete DeviceTimerService.processes[timeStamp]
  }

  static register(process: ProcessInterface) {
    const timeStamp = CommonService.getTimestamp();

    process.indexInterval = 0;
    process.indexLoops = 0;
    process.complete = false;

    DeviceTimerService.processes[timeStamp] = process;

    return timeStamp;
  }

  static cleanTimerQueue() {
    let processKeys = Object.keys(DeviceTimerService.processes);

    processKeys.forEach((key) => {
      DeviceTimerService.unregister(key);
    });
  }

  static startDeviceTimer() {
    // starting looping
    DeviceTimerService.animationFrame = DeviceTimerService.requestAnimationFrame(DeviceTimerService.deviceTimer);
  }

  static killDeviceTimer() {
    DeviceTimerService.cancelAnimationFrame();
    DeviceTimerService.cleanTimerQueue();
  }
}
