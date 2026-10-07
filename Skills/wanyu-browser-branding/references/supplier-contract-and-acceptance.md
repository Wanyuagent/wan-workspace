# Supplier Contract and Acceptance Summary

## Conversation Summary

The reported defects were:

1. Google was selected in Wanyu settings, but the opened browser still used Baidu.
2. The launched browser did not show the Wanyu logo in the browser-shell position.
3. The visible browser serial did not match the Wanyu environment serial.
4. Wanyu needed its own first-open page, using competitor screenshots only as visual references.

The initial implementation separated Wanyu-controlled behavior from supplier-controlled browser chrome:

- the real Chromium default search preference is written for the managed provider;
- `serial_no` is passed as the visible serial instead of `launch_token`;
- the Wanyu first-open route carries non-secret environment display context;
- the Web app renders a branded environment page with live network information.

The supplier later confirmed this `browser.open` configuration shape:

```json
{
  "envs": [
    {
      "envId": "xxx",
      "forward": "",
      "args": [
        "--no-first-run",
        "--no-default-browser-check",
        "--disable-warning-prompt"
      ],
      "urls": ["https://example.invalid"],
      "yunConfig": {
        "shop": { "shortName": "序号" },
        "finger": { "fpSwitches": { "fpBookmark": 0 } }
      },
      "config": {}
    }
  ]
}
```

Treat this sample as a compatibility contract, not as an instruction to use its placeholder URL or environment ID.

## Confirmed Meanings

- `yunConfig.shop.shortName`: supplier-controlled displayed short name. The supplier described a three-Chinese-character display constraint; confirm actual length behavior when the serial is longer.
- `yunConfig.finger.fpSwitches.fpBookmark = 0`: turns off the supplier's custom bookmark-bar content.
- Browser icon delivery: supplier accepts PNG from 64x64 through 256x256. Prefer the checked-in 256x256 Wanyu icon and provide 64x64 only if requested.

## Product Acceptance

- Browser/page branding uses Wanyu assets.
- Page/tab title: `万域AI指纹浏览器助力跨境电商运营`.
- First-open content includes `万域AI指纹浏览器`, IPv4, country/region, timezone, and copy controls.
- Window metadata includes Wanyu serial and remark with a copy control.
- Network source is derived from actual window configuration:
  - `none` -> 本地网络
  - `external` -> 自持代理
  - `auto` or `manual` -> 万域代理

## Supplier Follow-up Boundary

The supplied fields do not define arbitrary content for the browser's injected information bar. If product requires IPv4, timezone, remark, proxy source, or copy buttons inside that browser chrome rather than on the Wanyu first-open page, request the supplier's supported field schema/API and obtain a rendered build for acceptance.

## Evidence Boundary

- Passing unit tests/typechecks proves payload construction and code compatibility.
- A Web build proves the page compiles.
- Only a real supplier-kernel launch proves `shortName`, bookmark behavior, and browser-chrome rendering.
- Only a signed/repackaged Windows build proves the executable, taskbar, and title-bar icon.
- Only a deployed first-open page opened through each proxy mode proves live IPv4/location/timezone display.
