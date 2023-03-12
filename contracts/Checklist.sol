// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Checklist {
    struct Item {
        bool checked;
        string text;
    }

    Item[] public items;

    function addItem(string memory _text) public {
        items.push(Item(false, _text));
    }

    function toggleItem(uint256 _index) public {
        require(_index < items.length, "Index out of range");
        items[_index].checked = !items[_index].checked;
    }
}
