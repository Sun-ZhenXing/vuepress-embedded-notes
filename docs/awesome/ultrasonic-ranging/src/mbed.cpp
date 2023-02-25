#include "mbed.h"

BusOut Disp(p5, p6, p7, p8, p9, p10, p11);
DigitalOut ctrl1(p12);
DigitalOut ctrl2(p13);
DigitalOut ctrl3(p14);

DigitalOut trigger(p15);
DigitalIn echo(p16);

Timer timer;

// 默认延迟时间
const int LED_DELAY = 1;

// 数码管数字
const unsigned char NUM_SEG[] = {
    0b0111111,
    0b0000110,
    0b1011011,
    0b1001111,
    0b1100110,
    0b1101101,
    0b1111101,
    0b0000111,
    0b1111111,
    0b1101111
};

void clear() {
    ctrl1 = 0;
    ctrl2 = 0;
    ctrl3 = 0;
    Disp = (unsigned char)0;
    wait_ms(LED_DELAY);
}

long microsecondsToCentimeters(long microseconds) {
    return microseconds / 53;
}

/**
 * @brief 写数字到数码管
 * @param number 数字
 * @param s 第几个灯
 */
void draw_digital(int number, int s) {
    if (s == 1) {
        ctrl1 = 1;
        ctrl2 = 1;
        ctrl3 = 0;
    } else if (s == 2) {
        ctrl1 = 1;
        ctrl2 = 0;
        ctrl3 = 1;
    } else {
        ctrl1 = 0;
        ctrl2 = 1;
        ctrl3 = 1;
    }
    Disp = NUM_SEG[number];
    wait_ms(LED_DELAY);
}

/**
 * @brief 显示数字
 * @param number 0-999 的数字
 */
void show_number(int number) {
    int hund = number / 100;
    int ten = (number - hund * 100) / 10;
    int one = number - hund * 100 - ten * 10;
    if (number >= 100) {
        draw_digital(hund, 1);
        wait_ms(LED_DELAY);
    }
    if (number >= 10) {
        draw_digital(ten, 2);
        wait_ms(LED_DELAY);
    }
    draw_digital(one, 3);
    wait_ms(LED_DELAY);
}

/**
 * @brief 计算误差时间
 * @return int
 */
int get_correction() {
    timer.reset();
    timer.start();
    while (echo == 2)
        ;
    timer.stop();
    return timer.read_us();
}

int main() {
    int correction = get_correction();
    while (true) {
        trigger = 1;
        timer.reset();
        wait_us(10);
        trigger = 0;
        while (echo == 0)
            ;
        timer.start();
        while (echo == 1)
            ;
        timer.stop();
        int distance = microsecondsToCentimeters(timer.read_us() - correction);
        int i = 15;
        while (i--) {
            if (distance < 1000 && distance >= 0) {
                show_number(distance);
            }
            wait_ms(LED_DELAY * 10);
            clear();
            wait_ms(LED_DELAY * 10);
        }
    }
}
